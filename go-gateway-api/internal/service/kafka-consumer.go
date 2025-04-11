package service

import (
	"context"
	"encoding/json"
	"log/slog"
	"os"
	"strings"

	"github.com/rodolfoHOk/fullcycle.imersao22/go-gateway-api/internal/domain/events"
	"github.com/segmentio/kafka-go"
)

type KafkaConsumerInterface interface {
	Consume(ctx context.Context) error
	Close() error
}

type KafkaConfig struct {
	Brokers []string
	Topic   string
}

func NewKafkaConfig(topic string) *KafkaConfig {
	broker := os.Getenv("KAFKA_BROKER")
	if broker == "" {
		broker = "localhost:9092"
	}

	return &KafkaConfig{
		Brokers: strings.Split(broker, ","),
		Topic:   topic,
	}
}

type KafkaConsumer struct {
	reader         *kafka.Reader
	topic          string
	brokers        []string
	groupID        string
	invoiceService *InvoiceService
}

func NewKafkaConsumer(config *KafkaConfig, groupID string, invoiceService *InvoiceService) *KafkaConsumer {
	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers: config.Brokers,
		Topic:   config.Topic,
		GroupID: groupID,
	})

	slog.Info("kafka consumer iniciado",
		"brokers", config.Brokers,
		"topic", config.Topic,
		"group_id", groupID)

	return &KafkaConsumer{
		reader:         reader,
		topic:          config.Topic,
		brokers:        config.Brokers,
		groupID:        groupID,
		invoiceService: invoiceService,
	}
}

func (c *KafkaConsumer) Consume(ctx context.Context) error {
	for {
		msg, err := c.reader.ReadMessage(ctx)
		if err != nil {
			slog.Error("erro ao ler mensagem do kafka", "error", err)
			return err
		}

		var result events.TransactionResult
		if err := json.Unmarshal(msg.Value, &result); err != nil {
			slog.Error("erro ao converter mensagem para TransactionResult", "error", err)
			continue
		}

		slog.Info("mensagem recebida do kafka",
			"topic", c.topic,
			"invoice_id", result.InvoiceID,
			"status", result.Status)

		if err := c.invoiceService.ProcessTransactionResult(result.InvoiceID, result.ToDomainStatus()); err != nil {
			slog.Error("erro ao processar resultado da transação",
				"error", err,
				"invoice_id", result.InvoiceID,
				"status", result.Status)
			continue
		}

		slog.Info("transação processada com sucesso",
			"invoice_id", result.InvoiceID,
			"status", result.Status)
	}
}

func (c *KafkaConsumer) Close() error {
	slog.Info("fechando conexão com o kafka consumer")
	return c.reader.Close()
}

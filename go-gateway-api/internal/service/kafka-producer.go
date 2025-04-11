package service

import (
	"context"
	"encoding/json"
	"log/slog"

	"github.com/rodolfoHOk/fullcycle.imersao22/go-gateway-api/internal/domain/events"
	"github.com/segmentio/kafka-go"
)

type KafkaProducerInterface interface {
	SendingPendingTransaction(ctx context.Context, event events.PendingTransaction) error
	Close() error
}

type KafkaProducer struct {
	writer  *kafka.Writer
	topic   string
	brokers []string
}

func NewKafkaProducer(config *KafkaConfig) *KafkaProducer {
	writer := &kafka.Writer{
		Addr:     kafka.TCP(config.Brokers...),
		Topic:    config.Topic,
		Balancer: &kafka.LeastBytes{},
	}

	slog.Info("kafka producer iniciado", "brokers", config.Brokers, "topic", config.Topic)
	return &KafkaProducer{
		writer:  writer,
		topic:   config.Topic,
		brokers: config.Brokers,
	}
}

func (s *KafkaProducer) SendingPendingTransaction(ctx context.Context, event events.PendingTransaction) error {
	value, err := json.Marshal(event)
	if err != nil {
		slog.Error("erro ao converter evento para json", "error", err)
		return err
	}

	msg := kafka.Message{
		Value: value,
	}

	slog.Info("enviando mensagem para o kafka",
		"topic", s.topic,
		"message", string(value))

	if err := s.writer.WriteMessages(ctx, msg); err != nil {
		slog.Error("erro ao enviar mensagem para o kafka", "error", err)
		return err
	}

	slog.Info("mensagem enviada com sucesso para o kafka", "topic", s.topic)
	return nil
}

func (s *KafkaProducer) Close() error {
	slog.Info("fechando conexão com o kafka")
	return s.writer.Close()
}

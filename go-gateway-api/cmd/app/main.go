package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/rodolfoHOk/fullcycle.imersao22/go-gateway-api/internal/repository"
	"github.com/rodolfoHOk/fullcycle.imersao22/go-gateway-api/internal/service"
	"github.com/rodolfoHOk/fullcycle.imersao22/go-gateway-api/internal/web/server"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file")
	}

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		getEnv("DB_HOST", "db"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_USER", "postgres"),
		getEnv("DB_PASSWORD", "postgres"),
		getEnv("DB_NAME", "gateway"),
		getEnv("DB_SSLMODE", "disable"),
	)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	accountRepository := repository.NewAccountRepository(db)
	invoiceRepository := repository.NewInvoiceRepository(db)

	producerTopic := getEnv("KAFKA_PENDING_TRANSACTIONS_TOPIC", "pending_transactions")
	producerConfig := service.NewKafkaConfig(producerTopic)
	kafkaProducer := service.NewKafkaProducer(producerConfig)
	defer kafkaProducer.Close()

	accountService := service.NewAccountService(accountRepository)
	invoiceService := service.NewInvoiceService(invoiceRepository, *accountService, kafkaProducer)

	consumerTopic := getEnv("KAFKA_TRANSACTIONS_RESULT_TOPIC", "transaction_results")
	consumerConfig := service.NewKafkaConfig(consumerTopic)
	groupID := getEnv("KAFKA_CONSUMER_GROUP_ID", "gateway-group")
	kafkaConsumer := service.NewKafkaConsumer(consumerConfig, groupID, invoiceService)
	defer kafkaConsumer.Close()

	go func() {
		if err := kafkaConsumer.Consume(context.Background()); err != nil {
			log.Printf("Error consuming kafka messages: %v", err)
		}
	}()

	port := getEnv("HTTP_PORT", "8080")
	srv := server.NewServer(accountService, invoiceService, port)
	srv.ConfigureRoutes()

	if err := srv.Start(); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

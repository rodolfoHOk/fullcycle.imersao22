package main

import (
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
	accountService := service.NewAccountService(accountRepository)
	invoiceService := service.NewInvoiceService(invoiceRepository, *accountService)

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

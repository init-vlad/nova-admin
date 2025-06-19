package models

import curd_repo_models "github.com/init-pkg/nova/modules/crud/repo/models"

type Product struct {
	curd_repo_models.Model

	Name        string `json:"name"`
	Price       int    `json:"price"`
	Description string `json:"description"`
}

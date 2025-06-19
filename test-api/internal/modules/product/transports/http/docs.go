package product_http_handler

import nova_gorm_fields "github.com/init-pkg/nova/shared/gorm/fields"

// --- Swagger doc stubs for OpenAPI ---
// @Summary Get list of Product
// @Tags products
// @Accept json
// @Produce json
// @Param   page     query    int     false  "Page number"
// @Param   per_page query    int     false  "Items per page"
// @Success 200 {object} GetEntitiesResponse
// @Router /products [get]
func _(ctx any) error { return nil }

// @Summary Get Product by ID
// @Tags products
// @Accept json
// @Produce json
// @Param   id   path     string  true  "ID"
// @Success 200 {object} CreateProductRequest
// @Router /products/{id} [get]
func _(ctx any) error { return nil }

// @Summary Create Product
// @Tags products
// @Accept json
// @Produce json
// @Param   body  body     CreateProductRequest  true  "Create DTO"
// @Success 201 {object} CreateProductRequest
// @Router /products [post]
func _(ctx any) error { return nil }

// @Summary Update Product
// @Tags products
// @Accept json
// @Produce json
// @Param   id    path     string  true  "ID"
// @Param   body  body     UpdateProductRequest  true  "Update DTO"
// @Success 200 {object} CreateProductRequest
// @Router /products/{id} [patch]
func _(ctx any) error { return nil }

// @Summary Delete Product
// @Tags products
// @Accept json
// @Produce json
// @Param   id   path     string  true  "ID"
// @Success 200 {object} nil
// @Router /products/{id} [delete]
func _(ctx any) error { return nil }

// @Summary Batch delete Product
// @Tags products
// @Accept json
// @Produce json
// @Param   body  body     BatchDeleteRequest  true  "IDs to delete"
// @Success 200 {object} nil
// @Router /products/batch-delete [post]
func _(ctx any) error { return nil }

// --- Types for OpenAPI ---
type UUID = nova_gorm_fields.UUID

type Product struct{
	ID UUID `json:"id"`
}

type CreateProductRequest struct{
	Product
}
type UpdateProductRequest struct{
	Product
}

type BatchDeleteRequest struct {
    IDs []UUID `json:"ids"`
}
type GetEntitiesResponse struct {
    Data  []*Product `json:"data"`
    Total int64                `json:"total"`
}

package org.service_entity.entity.service.model;

import org.service_entity.entity.repository.model.RepositoryProductModel;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public RepositoryProductModel toRepositoryModel(ProductCreateDTO dto) {
        return RepositoryProductModel.builder()
                .name(dto.getName().trim())
                .description(dto.getDescription() != null ? dto.getDescription().trim() : null)
                .price(dto.getPrice())
                .stock(0)
                .deleted(false)
                .build();
    }

    public ProductResponseDTO toResponseDTO(RepositoryProductModel model) {
        return new ProductResponseDTO(
                model.getId(),
                model.getName(),
                model.getDescription(),
                model.getPrice(),
                model.getStock(),
                model.getDeleted(),
                model.getCreatedAt()
        );
    }

    public void updateFromDTO(ProductUpdateDTO dto, RepositoryProductModel model) {
        if (dto.getName() != null && !dto.getName().isBlank()) {
            model.setName(dto.getName().trim());
        }
        if (dto.getDescription() != null) {
            model.setDescription(dto.getDescription().trim());
        }
        if (dto.getPrice() != null) {
            model.setPrice(dto.getPrice());
        }
    }
}

package org.service_entity.entity.repository.jpa.model;

import org.service_entity.entity.repository.model.RepositoryProductModel;
import org.springframework.stereotype.Component;

@Component
public class JPAProductMapper {

    public RepositoryProductModel toDomain(JPAProductModel jpa) {
        return RepositoryProductModel.builder()
                .id(jpa.getId())
                .name(jpa.getName())
                .description(jpa.getDescription())
                .price(jpa.getPrice())
                .stock(jpa.getStock())
                .deleted(jpa.getDeleted())
                .createdAt(jpa.getCreatedAt())
                .updatedAt(jpa.getUpdatedAt())
                .build();
    }

    public JPAProductModel toJPA(RepositoryProductModel model) {
        return JPAProductModel.builder()
                .id(model.getId())
                .name(model.getName())
                .description(model.getDescription())
                .price(model.getPrice())
                .stock(model.getStock())
                .deleted(model.getDeleted() != null ? model.getDeleted() : false)
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .build();
    }
}

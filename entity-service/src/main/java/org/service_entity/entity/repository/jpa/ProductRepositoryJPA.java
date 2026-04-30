package org.service_entity.entity.repository.jpa;

import org.service_entity.entity.repository.jpa.model.JPAProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepositoryJPA
        extends JpaRepository<JPAProductModel, Long>, JpaSpecificationExecutor<JPAProductModel> {
}

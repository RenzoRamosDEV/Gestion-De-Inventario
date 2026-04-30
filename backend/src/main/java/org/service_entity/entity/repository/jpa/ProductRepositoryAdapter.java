package org.service_entity.entity.repository.jpa;

import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.service_entity.entity.repository.ProductRepository;
import org.service_entity.entity.repository.jpa.model.JPAProductMapper;
import org.service_entity.entity.repository.jpa.model.JPAProductModel;
import org.service_entity.entity.repository.model.RepositoryProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ProductRepositoryAdapter implements ProductRepository {

    private final ProductRepositoryJPA jpaRepo;
    private final JPAProductMapper mapper;

    @Override
    public RepositoryProductModel save(RepositoryProductModel model) {
        JPAProductModel entity = mapper.toJPA(model);
        return mapper.toDomain(jpaRepo.save(entity));
    }

    @Override
    public Optional<RepositoryProductModel> findById(Long id) {
        return jpaRepo.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public Page<RepositoryProductModel> findAll(
            Pageable pageable,
            String name,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Boolean inStock,
            Boolean showDeleted
    ) {
        Specification<JPAProductModel> spec = buildSpec(name, minPrice, maxPrice, inStock, showDeleted);
        return jpaRepo.findAll(spec, pageable).map(mapper::toDomain);
    }

    @Override
    public void softDelete(Long id) {
        jpaRepo.findById(id).ifPresent(p -> {
            p.setDeleted(true);
            jpaRepo.save(p);
        });
    }

    @Override
    public boolean existsActiveById(Long id) {
        return jpaRepo.findById(id)
                .map(p -> !p.getDeleted())
                .orElse(false);
    }

    private Specification<JPAProductModel> buildSpec(
            String name, BigDecimal minPrice, BigDecimal maxPrice, Boolean inStock, Boolean showDeleted) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (!Boolean.TRUE.equals(showDeleted)) {
                predicates.add(cb.equal(root.get("deleted"), false));
            }

            if (name != null && !name.isBlank()) {
                predicates.add(cb.like(
                        cb.lower(root.get("name")),
                        "%" + name.toLowerCase() + "%"
                ));
            }

            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (Boolean.TRUE.equals(inStock)) {
                predicates.add(cb.greaterThan(root.get("stock"), 0));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

package course.spring.vehtrader.repo;

import course.spring.vehtrader.model.Offer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OffersRepository extends MongoRepository<Offer, String> {
    List<Offer> findByUserId(String userId);
}

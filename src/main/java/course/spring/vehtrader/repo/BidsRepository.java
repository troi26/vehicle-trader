package course.spring.vehtrader.repo;

import course.spring.vehtrader.model.Bid;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BidsRepository extends MongoRepository<Bid, String> {
}

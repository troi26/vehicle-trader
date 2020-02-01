package course.spring.vehtrader.repo;

import course.spring.vehtrader.model.Bid;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import java.util.List;

public interface BidsRepository extends ReactiveMongoRepository<Bid, String> {

}

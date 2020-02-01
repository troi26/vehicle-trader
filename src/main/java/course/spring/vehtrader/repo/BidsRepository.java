package course.spring.vehtrader.repo;

import course.spring.vehtrader.domain.BidsService;
import course.spring.vehtrader.model.Bid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public interface BidsRepository extends ReactiveMongoRepository<Bid, String> {

}

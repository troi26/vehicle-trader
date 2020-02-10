package course.spring.vehtrader.repo;

import course.spring.vehtrader.model.Bid;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface BidsRepository extends ReactiveMongoRepository<Bid, String> {
    @Tailable
    public Flux<Bid> findAllByOfferId (String offerId);

    @Tailable
    public Flux<Bid> findAllByUserId (String userId);
}

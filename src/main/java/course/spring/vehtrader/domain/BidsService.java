package course.spring.vehtrader.domain;

import course.spring.vehtrader.model.Bid;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface BidsService {
    Flux<Bid> findAll();
    Mono<Bid> findById(String id);
    Mono<Bid> create(Bid bid);
    Mono<Bid> update(Bid bid);
    Mono<Bid> delete(String id);
    Mono<Long> getCount();
}
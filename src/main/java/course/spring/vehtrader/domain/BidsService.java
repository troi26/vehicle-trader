package course.spring.vehtrader.domain;

import course.spring.vehtrader.model.Bid;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

public interface BidsService {
    Flux<Bid> findAll();
    Mono<Bid> findById(String id);
    Flux<Bid> findAllByOfferId(String id);
    Flux<Bid> findAllByUserId(String id);
    Mono<Bid> create(Bid bid);
    Mono<Bid> update(Bid bid);
    Mono<Bid> delete(String id);
    Mono<Long> getCount();
    Bid findOfferWinningBid(String offerId);
}
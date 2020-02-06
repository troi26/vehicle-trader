package course.spring.vehtrader.domain;

import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.Bid;
import course.spring.vehtrader.repo.BidsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

import static org.springframework.http.MediaType.APPLICATION_STREAM_JSON;

@Service
public class BidsServiceImpl implements BidsService {
    @Autowired
    BidsRepository repo;

    @Override
    public Flux<Bid> findAll() {
        return repo.findAll();
    }

    @Override
    public Mono<Bid> findById(String id) {
        return repo.findById(id)
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("Bid with ID:%s does not exist.", id))));
    }

    @Override
    public Flux<Bid> findAllByOfferId(String id) {
        return repo.findAllByOfferId(id);
    }

    @Override
    public Mono<Bid> create(Bid bid) {
        return repo.insert(bid);
    }

    @Override
    public Mono<Bid> update(Bid bid) {
        return repo.save(bid);
    }

    @Override
    public Mono<Bid> delete(String bidId) {
        return repo.findById(bidId)
                .flatMap(art -> repo.deleteById(bidId).thenReturn(art))
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("Bid with ID:%s does not exist.", bidId))));
    }

    @Override
    public Mono<Long> getCount() {
        return repo.count();
    }
}

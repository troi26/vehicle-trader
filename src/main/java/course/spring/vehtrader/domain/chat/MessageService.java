package course.spring.vehtrader.domain.chat;

import course.spring.vehtrader.model.chat.Message;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface MessageService {
    Flux<Message> findAll();
    Mono<Message> findById(String id);
    Mono<Message> create(Message message);
    Mono<Message> update(Message message);
    Mono<Message> delete(String id);
    Mono<Long> getCount();
}

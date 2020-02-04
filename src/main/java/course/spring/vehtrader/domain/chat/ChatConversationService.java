package course.spring.vehtrader.domain.chat;

import course.spring.vehtrader.model.chat.ChatConversation;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ChatConversationService {
    Flux<ChatConversation> findAll();
    Mono<ChatConversation> findById(String id);
    Mono<ChatConversation> create(ChatConversation chatConversation);
    Mono<ChatConversation> update(ChatConversation chatConversation);
    Mono<ChatConversation> delete(String id);
    Mono<Long> getCount();
}

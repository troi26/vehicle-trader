package course.spring.vehtrader.domain.chat;

import course.spring.vehtrader.model.chat.ChatMessage;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ChatMessageService {
    Flux<ChatMessage> findAll();

    Mono<ChatMessage> findById(String id);

    Mono<ChatMessage> create(ChatMessage chatConversation);

    Mono<ChatMessage> update(ChatMessage chatConversation);

    Mono<ChatMessage> delete(String id);

    Flux<ChatMessage> findBySenderAndReceiverId(String sender, String receiver);

    Flux<ChatMessage> findByChannelId(String channelId);

    Flux<ChatMessage> findByChannelIdIdOrByChannelId(String channelId1, String channelId2);

    Mono<Long> getCount();
}

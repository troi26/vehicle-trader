package course.spring.vehtrader.repo.chat;

import course.spring.vehtrader.model.chat.ChatMessage;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatMessageRepository extends ReactiveMongoRepository<ChatMessage, String> {
    @Tailable
    Flux<ChatMessage> findByChannelId(String channelId);

    @Tailable
    Flux<ChatMessage> findBySenderIdAndReceiverId(String sender, String receiver);
}

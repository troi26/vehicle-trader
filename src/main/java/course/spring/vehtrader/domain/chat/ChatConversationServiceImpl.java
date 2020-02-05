package course.spring.vehtrader.domain.chat;

import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.chat.ChatConversation;
import course.spring.vehtrader.repo.chat.ChatConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ChatConversationServiceImpl implements ChatConversationService {

    @Autowired
    ChatConversationRepository chatConversationRepository;
    @Override
    public Flux<ChatConversation> findAll() {
        return chatConversationRepository.findAll();
    }

    @Override
    public Mono<ChatConversation> findById(String id) {
        return chatConversationRepository.findById(id)
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("ChatConversation with ID:%s does not exist.", id))));
    }

    @Override
    public Mono<ChatConversation> create(ChatConversation chatConversation) {
        return chatConversationRepository.insert(chatConversation);
    }

    @Override
    public Mono<ChatConversation> update(ChatConversation chatConversation) {
        return chatConversationRepository.save(chatConversation);
    }

    @Override
    public Mono<ChatConversation> delete(String id) {
        return chatConversationRepository.findById(id)
                .flatMap(user -> chatConversationRepository.deleteById(id).thenReturn(user))
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("ChatConversation with ID:%s does not exist.", id))));
    }

    @Override
    public Flux<ChatConversation> getByUserId(String userId) {
        Flux<ChatConversation> chatUser1 = chatConversationRepository.findByUser1Id(userId);
        Flux<ChatConversation> chatUser2 = chatConversationRepository.findByUser2Id(userId);
        return Flux.concat(chatUser1, chatUser2).switchIfEmpty(Flux.error(new NonExistingEntityException(String.format("ChatConversation with userID: %s involved does not exist.", userId))));
    }

    @Override
    public Mono<Long> getCount() {
        return chatConversationRepository.count();
    }
}

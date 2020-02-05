package course.spring.vehtrader.web.chat;

import course.spring.vehtrader.domain.chat.ChatConversationService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.model.chat.ChatConversation;
import course.spring.vehtrader.model.chat.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/chat")
public class ChatConversationController {

    @Autowired
    private ChatConversationService chatConversationService;

    @GetMapping
    public Flux<ChatConversation> getAllChatConversations() {
        return chatConversationService.findAll();
    }

    @GetMapping("{id}")
    public Mono<ChatConversation> getChatConversationId(@PathVariable String id) {
        return chatConversationService.findById(id);
    }
    @GetMapping("/user/{userId}")
    public Flux<ChatConversation> getChatConversationByUserId(@PathVariable String userId) {
        return chatConversationService.getByUserId(userId);
    }

    @PostMapping
    public Mono<ChatConversation> insertChatConversation(@RequestBody ChatConversation chatConversation){
        return chatConversationService.create(chatConversation);
    }

    @PostMapping("{id}")
    public Mono<ChatConversation> insertMessageIntoConversation(@PathVariable String id, @RequestBody Message message){
        Mono<ChatConversation> chatConversationMono = chatConversationService.findById(id);
        return chatConversationMono.flatMap(converstaion -> {
            converstaion.getMessageHistory().add(message);
            return Mono.just(converstaion);
        }).flatMap(chatConversationService::update);
    }

    //We don't want PutMethod because that way one could alter the message history.

//    @PutMapping("{id}")
//    public Mono<ChatConversation> updateChatConversation(@PathVariable String id, @RequestBody ChatConversation chatConversation){
//        if(!id.equals(chatConversation.getId())) {
//            throw new InvalidEntityException(
//                    String.format("User ID='%s' is different from URL resource ID='%s'", chatConversation.getId(), id));
//        }
//        return chatConversationService.update(chatConversation);
//    }

    @DeleteMapping("{id}")
    public Mono<ChatConversation> deleteChatConversation(@PathVariable String id){
        return chatConversationService.delete(id);
    }
}

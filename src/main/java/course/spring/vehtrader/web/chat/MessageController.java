package course.spring.vehtrader.web.chat;

import course.spring.vehtrader.domain.chat.MessageService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.model.chat.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public Flux<Message> getAllMessages() {
        return messageService.findAll();
    }

    @GetMapping("{id}")
    public Mono<Message> getMessageBydId(@PathVariable String id) {
        return messageService.findById(id);
    }

    @PostMapping
    public Mono<Message> insertMessage(@RequestBody Message message){
        return messageService.create(message);
    }

    @PutMapping("{id}")
    public Mono<Message> updateMessage(@PathVariable String id, @RequestBody Message message){
        if(!id.equals(message.getId())) {
            throw new InvalidEntityException(
                    String.format("User ID='%s' is different from URL resource ID='%s'", message.getId(), id));
        }
        return messageService.update(message);
    }

    @DeleteMapping("{id}")
    public Mono<Message> deleteUser(@PathVariable String id){
        return messageService.delete(id);
    }
}

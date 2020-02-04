package course.spring.vehtrader.model.chat;

import course.spring.vehtrader.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("chat_conversations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    String id;
    User user1;
    User user2;
    String message;
    LocalDateTime messageDateTime;
}

package course.spring.vehtrader.model.forum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("forum")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForumPage {
    @Id
    String topic;
    List<Post> posts;
}
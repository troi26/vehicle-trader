package course.spring.vehtrader.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("bids")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bid {
    @Id
    private String id;
}



























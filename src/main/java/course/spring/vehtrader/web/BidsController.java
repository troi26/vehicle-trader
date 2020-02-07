package course.spring.vehtrader.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import course.spring.vehtrader.domain.BidsService;
import course.spring.vehtrader.model.Bid;
import course.spring.vehtrader.repo.BidsRepository;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.ServerResponse;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.MediaType.*;

@RestController
@CrossOrigin
@RequestMapping("/api/bids")
public class BidsController {
    @Autowired
    private BidsService bidsService;
//    @Autowired
//    private BidsRepository bidsRepository;


    @CrossOrigin
//    @PostMapping(path = "/save")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
//            , produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Bid> postBid(@RequestBody Bid bid, BindingResult bindingResult) {
//        System.out.println(bid);

        Mono<Bid> created = bidsService.create(bid);
//        created.subscribe();

        return created;
    }

    @CrossOrigin
    @GetMapping(path = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Bid> streamBids(@RequestParam("offerId") String offerId){
        return bidsService.findAllByOfferId(offerId);
    }

//    @GetMapping
//    public List<Bid> getBids() {
////        return ServerResponse.ok()
////                .contentType(APPLICATION_STREAM_JSON)
////                .body(bidsService.findAll(), Bid.class);
//        List<Bid> bids = new ArrayList<>();
//        bidsService.findAll().subscribe(bids::add);
//        return bids;
//    }
}

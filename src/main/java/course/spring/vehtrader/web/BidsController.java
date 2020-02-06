package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.BidsService;
import course.spring.vehtrader.model.Bid;
import course.spring.vehtrader.repo.BidsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.ServerResponse;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_STREAM_JSON;

@RestController
@CrossOrigin
@RequestMapping("/api/bids")
public class BidsController {
    @Autowired
//    private BidsService bidsService;
    private BidsRepository bidsRepository;

//    @GetMapping
//    public List<Bid> getBids() {
//        List<Bid> bids = new ArrayList<>();
//        bidsService.findAll().subscribe(bids::add);
//        return bids;
//    }

    @GetMapping(path = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Bid> streamMessages(@RequestParam("offerId") String offerId){
        return bidsRepository.findAllByOfferId(offerId);
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

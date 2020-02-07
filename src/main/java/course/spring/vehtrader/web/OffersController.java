package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.OffersService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.model.Offer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
public class OffersController {
    @Autowired
    private OffersService offerService;

    @GetMapping
    public List<Offer> getAllOffers() {
        return offerService.findAll();
    }

    @GetMapping(params = "userId")
    public List<Offer> getOfferByUserId(@RequestParam("userId") String userId) {
        return offerService.findByUserId(userId);
    }

    @GetMapping(params = "id")
    public Offer getOfferBydId(@RequestParam("id") String id) {
        return offerService.findById(id);
    }

    @PostMapping
    public Offer insertOffer(@RequestBody Offer offer){
        return offerService.create(offer);
    }

    @PutMapping("{id}")
    public Offer updateOffer(@PathVariable("id") String id, @RequestBody Offer offer){
        if(!id.equals(offer.getId())) {
            throw new InvalidEntityException(
                    String.format("Offer ID='%s' is different from URL resource ID='%s'", offer.getId(), id));
        }
        return offerService.update(offer);
    }

    @DeleteMapping("{id}")
    public Offer deleteOffer(@PathVariable("id") String id){
        return offerService.delete(id);
    }
}

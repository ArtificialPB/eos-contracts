#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <iostream>
#include <tables/agreement.h>
#include <typedefs/typedefs.h>
#include <vector>
#include <booking_info.h>

using namespace eosio;

class booking : public eosio::contract {
private:

    bool agreementWithRenterValid(account_name renter, vector <account_name> renters) {
        if (std::find(renters.begin(), renters.end(), renter) != std::end(renters)) {
            return true;
        }
        return false;
    }

public:
    using contract::contract;

    /// @abi action
    void book(booking_info info) {
        require_auth(info.owner);

        agreementIndex agreement(_self, _self);
        auto inserted = agreement.find(info.owner);
        if (inserted == agreement.end()) {
            agreement.emplace(_self, [&](auto &a) {
                a.acc = info.owner;
                a.renters.push_back(info.renter);
                a.timestamp = now();
                print("Added a new agreement at ", a.timestamp);
            });
        } else if (!agreementWithRenterValid(info.renter, inserted->renters)) {
            agreement.modify(inserted, _self, [&](auto &a) {
                a.renters.push_back(info.renter);
                a.timestamp = now();
                print("Agreement modified at ", a.timestamp);
            });
        } else {
            print("Agreement last modified at ", inserted->timestamp);
        }
    }
};


EOSIO_ABI( booking, (book)
)

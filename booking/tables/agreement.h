/// @abi table agreement i64
struct agreement {
    account_name acc;
    std::vector<account_name> renters;
    uint64_t timestamp;


    uint64_t primary_key() const {return acc;}

    EOSLIB_SERIALIZE(agreement, (acc)(renters)(timestamp))
};
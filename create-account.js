function createAccount(pin, amount) {
  return new Account(pin, amount);
};

class Account {
  constructor(pin, amount=0) {
    this.pin = pin;
    this.balance = amount;
  };

  checkBalance(pinInput) {
    if(this.pin === pinInput) return `$${this.balance}`;
    return "Invalid PIN."
  };

  deposit(pin, amount) {
    if(this.pin === pin) {
      this.balance += amount;
      return `Successfully deposited $${amount}. Current balance: $${this.balance}.`;
    };
    return "Invalid PIN."
  };

  withdraw(pin, amount) {
    if(this.pin === pin) {
      if(this.balance < amount) {
        return "Withdrawal amount exceeds account balance. Transaction cancelled.";
      };
      this.balance -= amount;
      return `Successfully withdrew $${amount}. Current balance: $${this.balance}.`;
    }
    return "Invalid PIN.";
  };

  changePin(oldPin, newPin) {
    if(oldPin === this.pin) {
      this.pin = newPin;
      return "PIN successfully changed!";
    };
    return "Invalid PIN."
  };
}

module.exports = { createAccount };

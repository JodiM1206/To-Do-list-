export default class Item {
    constructor(item_name, item_status, deadline, remind_in) {
        this.item_name = item_name;
        this.item_status = false;
        this.deadline = deadline;
        this.remind_in = remind_in;
    }
        toString(){
        return `Item: ${this.item_name}, Status: ${this.item_status}, Deadline: ${this.deadline}, Reminder: ${this.remind_in}`;
    }
}
import { Message } from "../";

interface IRepository {
  html_url: string;
  full_name: string;
  [index: string]: string | number | null;
}

module.exports = class ReEnableSubscription extends Message {
  private repository: IRepository;
  private creator: string;
  constructor(repository: IRepository, creator: string) {
    super({
      footer: `<${repository.html_url}|${repository.full_name}>`,
    });
    this.repository = repository;
    this.creator = creator;
  }

  public getAttachment() {
    return {
      ...this.getBaseMessage(),
      mrkdwn_in: ["text"],
      text: `Subscription to \`${this.repository.full_name}\` has been disabled, ` +
      `because the subscription creator (<@${this.creator}>) no longer has access.\n` +
      `Run \`/github subscribe ${this.repository.full_name}\` to re-enable the subscription`,
    };
  }

  public toJSON() {
    return {
      attachments: [this.getAttachment()],
      response_type: "in_channel",
    };
  }
};

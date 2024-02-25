type MessageProvider = AccountType | 'DEVJOBS';
  
interface Messages {

    news: Message[];
    read:  Message[];
    trash: Message[];
    updates: Message[];
    warnings: Message[];
    favorites: Message[];
}

interface Message {

    id: string;
    body: string;
    sender: string;
    subject: string;
    category?: string; // trash | favorites | warnings | news ...
    severity: Severity | 'normal'
    provider: MessageProvider;
}
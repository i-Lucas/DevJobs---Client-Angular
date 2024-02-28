type MessageProvider = AccountType | 'DEVJOBS';

type MessageSeverity = 'INFO' | 'WARN' | 'SUCCESS' | 'ERROR' | 'NORMAL';
type MessageCategory = 'TRASH' | 'FAVORITES' | 'WARNINGS' | 'NEWS' | 'READ' | 'UPDATES'

interface Notifications {

    news: Message[];
    read: Message[];
    trash: Message[];
    updates: Message[];
    warnings: Message[];
    favorites: Message[];
}

interface Message {

    id: string;

    subject: string;
    bodyHTML: string;

    senderEmail: string;
    receiverEmail: string;
    receiverAccountId: string;

    category: MessageCategory;
    severity: MessageSeverity;
    provider: MessageProvider;

    unread: boolean;
    selected?: boolean;

    createdAt: string;
    updatedAt: string;
}

// ---------------------------------------------------------------------------------------------------------------------

interface NotificationsResponse {

    messages: Notifications,
    info: {
        unread: number,
        total: number
    }
}

interface MoveMessageToCategory {

    messageId: string;
    messages: Notifications;
    updateReadStatus?: boolean;
    toCategory: keyof Notifications;
    fromCategory: keyof Notifications;
}

interface PerformMessageBodyAction {
    event: Event;
    messageId: string
    action: 'restore' | 'delete' | 'favorite' | 'read' | 'unfavorite';
}

interface UpdateMessageResponse {
    messageId: string,
    oldCategory: keyof Notifications;
}

interface HandleUpdateMessage {

    updateUnread: boolean;
    category: keyof Notifications;
    response: ApiResponse<UpdateMessageResponse>;
}

interface PerformUpdateMessageRequestData {

    url: string;
    messageId: string;
    updateUnread?: boolean;
    category: keyof Notifications;
}
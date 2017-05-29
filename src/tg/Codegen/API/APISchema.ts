
import {HashMap} from "../../DataStructures/HashMap/HashMap";
import {ByteStream} from "../../DataStructures/ByteStream";

import {TLBytes} from "../../TL/Types/TLBytes";
import {TLInt} from "../../TL/Types/TLInt";
import {TLDouble} from "../../TL/Types/TLDouble";
import {TLLong} from "../../TL/Types/TLLong";
import {TLString} from "../../TL/Types/TLString";
import {TLVector} from "../../TL/Types/TLVector";

import {TLObject} from "../../TL/Interfaces/TLObject";
import {TLFunction} from "../../TL/Interfaces/TLFunction";

import {concat} from "../../Utils/BytesConcat";
import {deserializedObject} from "../../TL/TLObjectDeserializer";

export namespace API {
    export const layer = 57;

    export type BoolType = BoolFalse | BoolTrue;
    export type InputPeerType = InputPeerEmpty | InputPeerSelf | InputPeerChat | InputPeerUser | InputPeerChannel;
    export type InputUserType = InputUserEmpty | InputUserSelf | InputUser;
    export type InputContactType = InputPhoneContact;
    export type InputFileType = InputFile | InputFileBig;
    export type InputMediaType = InputMediaEmpty | InputMediaUploadedPhoto | InputMediaPhoto | InputMediaGeoPoint | InputMediaContact | InputMediaUploadedDocument | InputMediaUploadedThumbDocument | InputMediaDocument | InputMediaVenue | InputMediaGifExternal | InputMediaPhotoExternal | InputMediaDocumentExternal | InputMediaGame;
    export type InputChatPhotoType = InputChatPhotoEmpty | InputChatUploadedPhoto | InputChatPhoto;
    export type InputGeoPointType = InputGeoPointEmpty | InputGeoPoint;
    export type InputPhotoType = InputPhotoEmpty | InputPhoto;
    export type InputFileLocationType = InputFileLocation | InputEncryptedFileLocation | InputDocumentFileLocation;
    export type PeerType = PeerUser | PeerChat | PeerChannel;
    export namespace storage {
    	export type FileTypeType = storage.FileUnknown | storage.FileJpeg | storage.FileGif | storage.FilePng | storage.FilePdf | storage.FileMp3 | storage.FileMov | storage.FilePartial | storage.FileMp4 | storage.FileWebp;
    }
    export type FileLocationType = FileLocationUnavailable | FileLocation;
    export type UserType = UserEmpty | User;
    export type UserProfilePhotoType = UserProfilePhotoEmpty | UserProfilePhoto;
    export type UserStatusType = UserStatusEmpty | UserStatusOnline | UserStatusOffline | UserStatusRecently | UserStatusLastWeek | UserStatusLastMonth;
    export type ChatType = ChatEmpty | Chat | ChatForbidden | Channel | ChannelForbidden;
    export type ChatFullType = ChatFull | ChannelFull;
    export type ChatParticipantType = ChatParticipant | ChatParticipantCreator | ChatParticipantAdmin;
    export type ChatParticipantsType = ChatParticipantsForbidden | ChatParticipants;
    export type ChatPhotoType = ChatPhotoEmpty | ChatPhoto;
    export type MessageType = MessageEmpty | Message | MessageService;
    export type MessageMediaType = MessageMediaEmpty | MessageMediaPhoto | MessageMediaGeo | MessageMediaContact | MessageMediaUnsupported | MessageMediaDocument | MessageMediaWebPage | MessageMediaVenue | MessageMediaGame;
    export type MessageActionType = MessageActionEmpty | MessageActionChatCreate | MessageActionChatEditTitle | MessageActionChatEditPhoto | MessageActionChatDeletePhoto | MessageActionChatAddUser | MessageActionChatDeleteUser | MessageActionChatJoinedByLink | MessageActionChannelCreate | MessageActionChatMigrateTo | MessageActionChannelMigrateFrom | MessageActionPinMessage | MessageActionHistoryClear | MessageActionGameScore;
    export type PhotoType = PhotoEmpty | Photo;
    export type PhotoSizeType = PhotoSizeEmpty | PhotoSize | PhotoCachedSize;
    export type GeoPointType = GeoPointEmpty | GeoPoint;
    export type InputNotifyPeerType = InputNotifyPeer | InputNotifyUsers | InputNotifyChats | InputNotifyAll;
    export type InputPeerNotifyEventsType = InputPeerNotifyEventsEmpty | InputPeerNotifyEventsAll;
    export type PeerNotifyEventsType = PeerNotifyEventsEmpty | PeerNotifyEventsAll;
    export type PeerNotifySettingsType = PeerNotifySettingsEmpty | PeerNotifySettings;
    export type WallPaperType = WallPaper | WallPaperSolid;
    export type ReportReasonType = InputReportReasonSpam | InputReportReasonViolence | InputReportReasonPornography | InputReportReasonOther;
    export namespace contacts {
    	export type ContactsType = contacts.ContactsNotModified | contacts.Contacts;
    }
    export namespace contacts {
    	export type BlockedType = contacts.Blocked | contacts.BlockedSlice;
    }
    export namespace messages {
    	export type DialogsType = messages.Dialogs | messages.DialogsSlice;
    }
    export namespace messages {
    	export type MessagesType = messages.Messages | messages.MessagesSlice | messages.ChannelMessages;
    }
    export type MessagesFilterType = InputMessagesFilterEmpty | InputMessagesFilterPhotos | InputMessagesFilterVideo | InputMessagesFilterPhotoVideo | InputMessagesFilterPhotoVideoDocuments | InputMessagesFilterDocument | InputMessagesFilterUrl | InputMessagesFilterGif | InputMessagesFilterVoice | InputMessagesFilterMusic | InputMessagesFilterChatPhotos;
    export type UpdateType = UpdateNewMessage | UpdateMessageID | UpdateDeleteMessages | UpdateUserTyping | UpdateChatUserTyping | UpdateChatParticipants | UpdateUserStatus | UpdateUserName | UpdateUserPhoto | UpdateContactRegistered | UpdateContactLink | UpdateNewAuthorization | UpdateNewEncryptedMessage | UpdateEncryptedChatTyping | UpdateEncryption | UpdateEncryptedMessagesRead | UpdateChatParticipantAdd | UpdateChatParticipantDelete | UpdateDcOptions | UpdateUserBlocked | UpdateNotifySettings | UpdateServiceNotification | UpdatePrivacy | UpdateUserPhone | UpdateReadHistoryInbox | UpdateReadHistoryOutbox | UpdateWebPage | UpdateReadMessagesContents | UpdateChannelTooLong | UpdateChannel | UpdateNewChannelMessage | UpdateReadChannelInbox | UpdateDeleteChannelMessages | UpdateChannelMessageViews | UpdateChatAdmins | UpdateChatParticipantAdmin | UpdateNewStickerSet | UpdateStickerSetsOrder | UpdateStickerSets | UpdateSavedGifs | UpdateBotInlineQuery | UpdateBotInlineSend | UpdateEditChannelMessage | UpdateChannelPinnedMessage | UpdateBotCallbackQuery | UpdateEditMessage | UpdateInlineBotCallbackQuery | UpdateReadChannelOutbox | UpdateDraftMessage | UpdateReadFeaturedStickers | UpdateRecentStickers | UpdateConfig | UpdatePtsChanged;
    export namespace updates {
    	export type DifferenceType = updates.DifferenceEmpty | updates.Difference | updates.DifferenceSlice;
    }
    export type UpdatesType = UpdatesTooLong | UpdateShortMessage | UpdateShortChatMessage | UpdateShort | UpdatesCombined | Updates | UpdateShortSentMessage;
    export namespace photos {
    	export type PhotosType = photos.Photos | photos.PhotosSlice;
    }
    export namespace help {
    	export type AppUpdateType = help.AppUpdate | help.NoAppUpdate;
    }
    export type EncryptedChatType = EncryptedChatEmpty | EncryptedChatWaiting | EncryptedChatRequested | EncryptedChat | EncryptedChatDiscarded;
    export type EncryptedFileType = EncryptedFileEmpty | EncryptedFile;
    export type InputEncryptedFileType = InputEncryptedFileEmpty | InputEncryptedFileUploaded | InputEncryptedFile | InputEncryptedFileBigUploaded;
    export type EncryptedMessageType = EncryptedMessage | EncryptedMessageService;
    export namespace messages {
    	export type DhConfigType = messages.DhConfigNotModified | messages.DhConfig;
    }
    export namespace messages {
    	export type SentEncryptedMessageType = messages.SentEncryptedMessage | messages.SentEncryptedFile;
    }
    export type InputDocumentType = InputDocumentEmpty | InputDocument;
    export type DocumentType = DocumentEmpty | Document;
    export type NotifyPeerType = NotifyPeer | NotifyUsers | NotifyChats | NotifyAll;
    export type SendMessageActionType = SendMessageTypingAction | SendMessageCancelAction | SendMessageRecordVideoAction | SendMessageUploadVideoAction | SendMessageRecordAudioAction | SendMessageUploadAudioAction | SendMessageUploadPhotoAction | SendMessageUploadDocumentAction | SendMessageGeoLocationAction | SendMessageChooseContactAction | SendMessageGamePlayAction;
    export type InputPrivacyKeyType = InputPrivacyKeyStatusTimestamp | InputPrivacyKeyChatInvite;
    export type PrivacyKeyType = PrivacyKeyStatusTimestamp | PrivacyKeyChatInvite;
    export type InputPrivacyRuleType = InputPrivacyValueAllowContacts | InputPrivacyValueAllowAll | InputPrivacyValueAllowUsers | InputPrivacyValueDisallowContacts | InputPrivacyValueDisallowAll | InputPrivacyValueDisallowUsers;
    export type PrivacyRuleType = PrivacyValueAllowContacts | PrivacyValueAllowAll | PrivacyValueAllowUsers | PrivacyValueDisallowContacts | PrivacyValueDisallowAll | PrivacyValueDisallowUsers;
    export type DocumentAttributeType = DocumentAttributeImageSize | DocumentAttributeAnimated | DocumentAttributeSticker | DocumentAttributeVideo | DocumentAttributeAudio | DocumentAttributeFilename | DocumentAttributeHasStickers;
    export namespace messages {
    	export type StickersType = messages.StickersNotModified | messages.Stickers;
    }
    export namespace messages {
    	export type AllStickersType = messages.AllStickersNotModified | messages.AllStickers;
    }
    export type ContactLinkType = ContactLinkUnknown | ContactLinkNone | ContactLinkHasPhone | ContactLinkContact;
    export type WebPageType = WebPageEmpty | WebPagePending | WebPage;
    export namespace account {
    	export type PasswordType = account.NoPassword | account.Password;
    }
    export type ExportedChatInviteType = ChatInviteEmpty | ChatInviteExported;
    export type ChatInviteType = ChatInviteAlready | ChatInvite;
    export type InputStickerSetType = InputStickerSetEmpty | InputStickerSetID | InputStickerSetShortName;
    export type KeyboardButtonType = KeyboardButton | KeyboardButtonUrl | KeyboardButtonCallback | KeyboardButtonRequestPhone | KeyboardButtonRequestGeoLocation | KeyboardButtonSwitchInline | KeyboardButtonGame;
    export type ReplyMarkupType = ReplyKeyboardHide | ReplyKeyboardForceReply | ReplyKeyboardMarkup | ReplyInlineMarkup;
    export namespace help {
    	export type AppChangelogType = help.AppChangelogEmpty | help.AppChangelog;
    }
    export type MessageEntityType = MessageEntityUnknown | MessageEntityMention | MessageEntityHashtag | MessageEntityBotCommand | MessageEntityUrl | MessageEntityEmail | MessageEntityBold | MessageEntityItalic | MessageEntityCode | MessageEntityPre | MessageEntityTextUrl | MessageEntityMentionName | InputMessageEntityMentionName;
    export type InputChannelType = InputChannelEmpty | InputChannel;
    export namespace updates {
    	export type ChannelDifferenceType = updates.ChannelDifferenceEmpty | updates.ChannelDifferenceTooLong | updates.ChannelDifference;
    }
    export type ChannelMessagesFilterType = ChannelMessagesFilterEmpty | ChannelMessagesFilter;
    export type ChannelParticipantType = ChannelParticipant | ChannelParticipantSelf | ChannelParticipantModerator | ChannelParticipantEditor | ChannelParticipantKicked | ChannelParticipantCreator;
    export type ChannelParticipantsFilterType = ChannelParticipantsRecent | ChannelParticipantsAdmins | ChannelParticipantsKicked | ChannelParticipantsBots;
    export type ChannelParticipantRoleType = ChannelRoleEmpty | ChannelRoleModerator | ChannelRoleEditor;
    export type FoundGifType = FoundGif | FoundGifCached;
    export namespace messages {
    	export type SavedGifsType = messages.SavedGifsNotModified | messages.SavedGifs;
    }
    export type InputBotInlineMessageType = InputBotInlineMessageMediaAuto | InputBotInlineMessageText | InputBotInlineMessageMediaGeo | InputBotInlineMessageMediaVenue | InputBotInlineMessageMediaContact | InputBotInlineMessageGame;
    export type InputBotInlineResultType = InputBotInlineResult | InputBotInlineResultPhoto | InputBotInlineResultDocument | InputBotInlineResultGame;
    export type BotInlineMessageType = BotInlineMessageMediaAuto | BotInlineMessageText | BotInlineMessageMediaGeo | BotInlineMessageMediaVenue | BotInlineMessageMediaContact;
    export type BotInlineResultType = BotInlineResult | BotInlineMediaResult;
    export namespace auth {
    	export type CodeTypeType = auth.CodeTypeSms | auth.CodeTypeCall | auth.CodeTypeFlashCall;
    }
    export namespace auth {
    	export type SentCodeTypeType = auth.SentCodeTypeApp | auth.SentCodeTypeSms | auth.SentCodeTypeCall | auth.SentCodeTypeFlashCall;
    }
    export type TopPeerCategoryType = TopPeerCategoryBotsPM | TopPeerCategoryBotsInline | TopPeerCategoryCorrespondents | TopPeerCategoryGroups | TopPeerCategoryChannels;
    export namespace contacts {
    	export type TopPeersType = contacts.TopPeersNotModified | contacts.TopPeers;
    }
    export type DraftMessageType = DraftMessageEmpty | DraftMessage;
    export namespace messages {
    	export type FeaturedStickersType = messages.FeaturedStickersNotModified | messages.FeaturedStickers;
    }
    export namespace messages {
    	export type RecentStickersType = messages.RecentStickersNotModified | messages.RecentStickers;
    }
    export namespace messages {
    	export type StickerSetInstallResultType = messages.StickerSetInstallResultSuccess | messages.StickerSetInstallResultArchive;
    }
    export type StickerSetCoveredType = StickerSetCovered | StickerSetMultiCovered;
    export type InputStickeredMediaType = InputStickeredMediaPhoto | InputStickeredMediaDocument;
    export type InputGameType = InputGameID | InputGameShortName;

    export class BoolFalse implements TLObject {
        static readonly cons = new TLInt(0xbc799737);
    
        static deserialized(_data: ByteStream): BoolFalse | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BoolFalse.cons)) return undefined;
            return new BoolFalse()
        }
    
        serialized(): Uint8Array {
            const constructor = BoolFalse.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class BoolFalse
    

    export class BoolTrue implements TLObject {
        static readonly cons = new TLInt(0x997275b5);
    
        static deserialized(_data: ByteStream): BoolTrue | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BoolTrue.cons)) return undefined;
            return new BoolTrue()
        }
    
        serialized(): Uint8Array {
            const constructor = BoolTrue.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class BoolTrue
    

    export class InputPeerEmpty implements TLObject {
        static readonly cons = new TLInt(0x7f3b18ea);
    
        static deserialized(_data: ByteStream): InputPeerEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPeerEmpty.cons)) return undefined;
            return new InputPeerEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPeerEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPeerEmpty
    

    export class InputPeerSelf implements TLObject {
        static readonly cons = new TLInt(0x7da07ec9);
    
        static deserialized(_data: ByteStream): InputPeerSelf | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPeerSelf.cons)) return undefined;
            return new InputPeerSelf()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPeerSelf.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPeerSelf
    

    export class InputPeerChat implements TLObject {
        static readonly cons = new TLInt(0x179be863);
    
        static deserialized(_data: ByteStream): InputPeerChat | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPeerChat.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            return new InputPeerChat(
                chatId)
        }
    
        serialized(): Uint8Array {
            const constructor = InputPeerChat.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt) {}
    
    } // class InputPeerChat
    

    export class InputPeerUser implements TLObject {
        static readonly cons = new TLInt(0x7b8e7de6);
    
        static deserialized(_data: ByteStream): InputPeerUser | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPeerUser.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputPeerUser(
                userId,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputPeerUser.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly accessHash: TLLong) {}
    
    } // class InputPeerUser
    

    export class InputPeerChannel implements TLObject {
        static readonly cons = new TLInt(0x20adaef8);
    
        static deserialized(_data: ByteStream): InputPeerChannel | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPeerChannel.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputPeerChannel(
                channelId,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputPeerChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt,
            readonly accessHash: TLLong) {}
    
    } // class InputPeerChannel
    

    export class InputUserEmpty implements TLObject {
        static readonly cons = new TLInt(0xb98886cf);
    
        static deserialized(_data: ByteStream): InputUserEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputUserEmpty.cons)) return undefined;
            return new InputUserEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputUserEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputUserEmpty
    

    export class InputUserSelf implements TLObject {
        static readonly cons = new TLInt(0xf7c1b13f);
    
        static deserialized(_data: ByteStream): InputUserSelf | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputUserSelf.cons)) return undefined;
            return new InputUserSelf()
        }
    
        serialized(): Uint8Array {
            const constructor = InputUserSelf.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputUserSelf
    

    export class InputUser implements TLObject {
        static readonly cons = new TLInt(0xd8292816);
    
        static deserialized(_data: ByteStream): InputUser | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputUser.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputUser(
                userId,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputUser.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly accessHash: TLLong) {}
    
    } // class InputUser
    

    export class InputPhoneContact implements TLObject {
        static readonly cons = new TLInt(0xf392b7f4);
    
        static deserialized(_data: ByteStream): InputPhoneContact | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPhoneContact.cons)) return undefined;
            const clientId = TLLong.deserialized(_data);
            if (!clientId) return undefined;
            const phone = TLString.deserialized(_data);
            if (!phone) return undefined;
            const firstName = TLString.deserialized(_data);
            if (!firstName) return undefined;
            const lastName = TLString.deserialized(_data);
            if (!lastName) return undefined;
            return new InputPhoneContact(
                clientId,
                phone,
                firstName,
                lastName)
        }
    
        serialized(): Uint8Array {
            const constructor = InputPhoneContact.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.clientId.serialized());
            data.push(this.phone.serialized());
            data.push(this.firstName.serialized());
            data.push(this.lastName.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly clientId: TLLong,
            readonly phone: TLString,
            readonly firstName: TLString,
            readonly lastName: TLString) {}
    
    } // class InputPhoneContact
    

    export class InputFile implements TLObject {
        static readonly cons = new TLInt(0xf52ff27f);
    
        static deserialized(_data: ByteStream): InputFile | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputFile.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const parts = TLInt.deserialized(_data);
            if (!parts) return undefined;
            const name = TLString.deserialized(_data);
            if (!name) return undefined;
            const md5Checksum = TLString.deserialized(_data);
            if (!md5Checksum) return undefined;
            return new InputFile(
                id,
                parts,
                name,
                md5Checksum)
        }
    
        serialized(): Uint8Array {
            const constructor = InputFile.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.parts.serialized());
            data.push(this.name.serialized());
            data.push(this.md5Checksum.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly parts: TLInt,
            readonly name: TLString,
            readonly md5Checksum: TLString) {}
    
    } // class InputFile
    

    export class InputFileBig implements TLObject {
        static readonly cons = new TLInt(0xfa4f0bb5);
    
        static deserialized(_data: ByteStream): InputFileBig | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputFileBig.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const parts = TLInt.deserialized(_data);
            if (!parts) return undefined;
            const name = TLString.deserialized(_data);
            if (!name) return undefined;
            return new InputFileBig(
                id,
                parts,
                name)
        }
    
        serialized(): Uint8Array {
            const constructor = InputFileBig.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.parts.serialized());
            data.push(this.name.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly parts: TLInt,
            readonly name: TLString) {}
    
    } // class InputFileBig
    

    export class InputMediaEmpty implements TLObject {
        static readonly cons = new TLInt(0x9664f57f);
    
        static deserialized(_data: ByteStream): InputMediaEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaEmpty.cons)) return undefined;
            return new InputMediaEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMediaEmpty
    

    export class InputMediaUploadedPhoto implements TLObject {
        static readonly cons = new TLInt(0x630c9af1);
    
        static deserialized(_data: ByteStream): InputMediaUploadedPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaUploadedPhoto.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const file = deserializedObject(_data) as InputFileType;
            if (!file) return undefined;
            
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            let stickers: TLVector<InputDocumentType> | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<InputDocumentType>;
                if (!obj) return undefined;
                stickers = obj
            }
            return new InputMediaUploadedPhoto(
                file,
                caption,
                stickers)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaUploadedPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.stickers) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.file.serialized());
            data.push(this.caption.serialized());
            if (this.stickers) data.push(this.stickers.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly file: InputFileType,
            readonly caption: TLString,
            readonly stickers: TLVector<InputDocumentType> | undefined) {}
    
    } // class InputMediaUploadedPhoto
    

    export class InputMediaPhoto implements TLObject {
        static readonly cons = new TLInt(0xe9bfb4f3);
    
        static deserialized(_data: ByteStream): InputMediaPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaPhoto.cons)) return undefined;
            const id = deserializedObject(_data) as InputPhotoType;
            if (!id) return undefined;
            
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            return new InputMediaPhoto(
                id,
                caption)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.caption.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputPhotoType,
            readonly caption: TLString) {}
    
    } // class InputMediaPhoto
    

    export class InputMediaGeoPoint implements TLObject {
        static readonly cons = new TLInt(0xf9c44144);
    
        static deserialized(_data: ByteStream): InputMediaGeoPoint | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaGeoPoint.cons)) return undefined;
            const geoPoint = deserializedObject(_data) as InputGeoPointType;
            if (!geoPoint) return undefined;
            
            return new InputMediaGeoPoint(
                geoPoint)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaGeoPoint.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.geoPoint.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly geoPoint: InputGeoPointType) {}
    
    } // class InputMediaGeoPoint
    

    export class InputMediaContact implements TLObject {
        static readonly cons = new TLInt(0xa6e45987);
    
        static deserialized(_data: ByteStream): InputMediaContact | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaContact.cons)) return undefined;
            const phoneNumber = TLString.deserialized(_data);
            if (!phoneNumber) return undefined;
            const firstName = TLString.deserialized(_data);
            if (!firstName) return undefined;
            const lastName = TLString.deserialized(_data);
            if (!lastName) return undefined;
            return new InputMediaContact(
                phoneNumber,
                firstName,
                lastName)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaContact.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumber.serialized());
            data.push(this.firstName.serialized());
            data.push(this.lastName.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly firstName: TLString,
            readonly lastName: TLString) {}
    
    } // class InputMediaContact
    

    export class InputMediaUploadedDocument implements TLObject {
        static readonly cons = new TLInt(0xd070f1e9);
    
        static deserialized(_data: ByteStream): InputMediaUploadedDocument | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaUploadedDocument.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const file = deserializedObject(_data) as InputFileType;
            if (!file) return undefined;
            
            const mimeType = TLString.deserialized(_data);
            if (!mimeType) return undefined;
            const attributes = TLVector.deserialized(_data, ) as TLVector<DocumentAttributeType>;
            if (!attributes) return undefined;
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            let stickers: TLVector<InputDocumentType> | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<InputDocumentType>;
                if (!obj) return undefined;
                stickers = obj
            }
            return new InputMediaUploadedDocument(
                file,
                mimeType,
                attributes,
                caption,
                stickers)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaUploadedDocument.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.stickers) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.file.serialized());
            data.push(this.mimeType.serialized());
            data.push(this.attributes.serialized());
            data.push(this.caption.serialized());
            if (this.stickers) data.push(this.stickers.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly file: InputFileType,
            readonly mimeType: TLString,
            readonly attributes: TLVector<DocumentAttributeType>,
            readonly caption: TLString,
            readonly stickers: TLVector<InputDocumentType> | undefined) {}
    
    } // class InputMediaUploadedDocument
    

    export class InputMediaUploadedThumbDocument implements TLObject {
        static readonly cons = new TLInt(0x50d88cae);
    
        static deserialized(_data: ByteStream): InputMediaUploadedThumbDocument | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaUploadedThumbDocument.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const file = deserializedObject(_data) as InputFileType;
            if (!file) return undefined;
            
            const thumb = deserializedObject(_data) as InputFileType;
            if (!thumb) return undefined;
            
            const mimeType = TLString.deserialized(_data);
            if (!mimeType) return undefined;
            const attributes = TLVector.deserialized(_data, ) as TLVector<DocumentAttributeType>;
            if (!attributes) return undefined;
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            let stickers: TLVector<InputDocumentType> | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<InputDocumentType>;
                if (!obj) return undefined;
                stickers = obj
            }
            return new InputMediaUploadedThumbDocument(
                file,
                thumb,
                mimeType,
                attributes,
                caption,
                stickers)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaUploadedThumbDocument.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.stickers) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.file.serialized());
            data.push(this.thumb.serialized());
            data.push(this.mimeType.serialized());
            data.push(this.attributes.serialized());
            data.push(this.caption.serialized());
            if (this.stickers) data.push(this.stickers.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly file: InputFileType,
            readonly thumb: InputFileType,
            readonly mimeType: TLString,
            readonly attributes: TLVector<DocumentAttributeType>,
            readonly caption: TLString,
            readonly stickers: TLVector<InputDocumentType> | undefined) {}
    
    } // class InputMediaUploadedThumbDocument
    

    export class InputMediaDocument implements TLObject {
        static readonly cons = new TLInt(0x1a77f29c);
    
        static deserialized(_data: ByteStream): InputMediaDocument | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaDocument.cons)) return undefined;
            const id = deserializedObject(_data) as InputDocumentType;
            if (!id) return undefined;
            
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            return new InputMediaDocument(
                id,
                caption)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaDocument.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.caption.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputDocumentType,
            readonly caption: TLString) {}
    
    } // class InputMediaDocument
    

    export class InputMediaVenue implements TLObject {
        static readonly cons = new TLInt(0x2827a81a);
    
        static deserialized(_data: ByteStream): InputMediaVenue | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaVenue.cons)) return undefined;
            const geoPoint = deserializedObject(_data) as InputGeoPointType;
            if (!geoPoint) return undefined;
            
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const address = TLString.deserialized(_data);
            if (!address) return undefined;
            const provider = TLString.deserialized(_data);
            if (!provider) return undefined;
            const venueId = TLString.deserialized(_data);
            if (!venueId) return undefined;
            return new InputMediaVenue(
                geoPoint,
                title,
                address,
                provider,
                venueId)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaVenue.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.geoPoint.serialized());
            data.push(this.title.serialized());
            data.push(this.address.serialized());
            data.push(this.provider.serialized());
            data.push(this.venueId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly geoPoint: InputGeoPointType,
            readonly title: TLString,
            readonly address: TLString,
            readonly provider: TLString,
            readonly venueId: TLString) {}
    
    } // class InputMediaVenue
    

    export class InputMediaGifExternal implements TLObject {
        static readonly cons = new TLInt(0x4843b0fd);
    
        static deserialized(_data: ByteStream): InputMediaGifExternal | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaGifExternal.cons)) return undefined;
            const url = TLString.deserialized(_data);
            if (!url) return undefined;
            const q = TLString.deserialized(_data);
            if (!q) return undefined;
            return new InputMediaGifExternal(
                url,
                q)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaGifExternal.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.url.serialized());
            data.push(this.q.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly url: TLString,
            readonly q: TLString) {}
    
    } // class InputMediaGifExternal
    

    export class InputMediaPhotoExternal implements TLObject {
        static readonly cons = new TLInt(0xb55f4f18);
    
        static deserialized(_data: ByteStream): InputMediaPhotoExternal | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaPhotoExternal.cons)) return undefined;
            const url = TLString.deserialized(_data);
            if (!url) return undefined;
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            return new InputMediaPhotoExternal(
                url,
                caption)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaPhotoExternal.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.url.serialized());
            data.push(this.caption.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly url: TLString,
            readonly caption: TLString) {}
    
    } // class InputMediaPhotoExternal
    

    export class InputMediaDocumentExternal implements TLObject {
        static readonly cons = new TLInt(0xe5e9607c);
    
        static deserialized(_data: ByteStream): InputMediaDocumentExternal | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaDocumentExternal.cons)) return undefined;
            const url = TLString.deserialized(_data);
            if (!url) return undefined;
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            return new InputMediaDocumentExternal(
                url,
                caption)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaDocumentExternal.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.url.serialized());
            data.push(this.caption.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly url: TLString,
            readonly caption: TLString) {}
    
    } // class InputMediaDocumentExternal
    

    export class InputMediaGame implements TLObject {
        static readonly cons = new TLInt(0xd33f43f3);
    
        static deserialized(_data: ByteStream): InputMediaGame | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMediaGame.cons)) return undefined;
            const id = deserializedObject(_data) as InputGameType;
            if (!id) return undefined;
            
            return new InputMediaGame(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMediaGame.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputGameType) {}
    
    } // class InputMediaGame
    

    export class InputChatPhotoEmpty implements TLObject {
        static readonly cons = new TLInt(0x1ca48f57);
    
        static deserialized(_data: ByteStream): InputChatPhotoEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputChatPhotoEmpty.cons)) return undefined;
            return new InputChatPhotoEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputChatPhotoEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputChatPhotoEmpty
    

    export class InputChatUploadedPhoto implements TLObject {
        static readonly cons = new TLInt(0x927c55b4);
    
        static deserialized(_data: ByteStream): InputChatUploadedPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputChatUploadedPhoto.cons)) return undefined;
            const file = deserializedObject(_data) as InputFileType;
            if (!file) return undefined;
            
            return new InputChatUploadedPhoto(
                file)
        }
    
        serialized(): Uint8Array {
            const constructor = InputChatUploadedPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.file.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly file: InputFileType) {}
    
    } // class InputChatUploadedPhoto
    

    export class InputChatPhoto implements TLObject {
        static readonly cons = new TLInt(0x8953ad37);
    
        static deserialized(_data: ByteStream): InputChatPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputChatPhoto.cons)) return undefined;
            const id = deserializedObject(_data) as InputPhotoType;
            if (!id) return undefined;
            
            return new InputChatPhoto(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = InputChatPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputPhotoType) {}
    
    } // class InputChatPhoto
    

    export class InputGeoPointEmpty implements TLObject {
        static readonly cons = new TLInt(0xe4c123d6);
    
        static deserialized(_data: ByteStream): InputGeoPointEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputGeoPointEmpty.cons)) return undefined;
            return new InputGeoPointEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputGeoPointEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputGeoPointEmpty
    

    export class InputGeoPoint implements TLObject {
        static readonly cons = new TLInt(0xf3b7acc9);
    
        static deserialized(_data: ByteStream): InputGeoPoint | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputGeoPoint.cons)) return undefined;
            const lat = TLDouble.deserialized(_data);
            if (!lat) return undefined;
            const long = TLDouble.deserialized(_data);
            if (!long) return undefined;
            return new InputGeoPoint(
                lat,
                long)
        }
    
        serialized(): Uint8Array {
            const constructor = InputGeoPoint.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.lat.serialized());
            data.push(this.long.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly lat: TLDouble,
            readonly long: TLDouble) {}
    
    } // class InputGeoPoint
    

    export class InputPhotoEmpty implements TLObject {
        static readonly cons = new TLInt(0x1cd7bf0d);
    
        static deserialized(_data: ByteStream): InputPhotoEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPhotoEmpty.cons)) return undefined;
            return new InputPhotoEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPhotoEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPhotoEmpty
    

    export class InputPhoto implements TLObject {
        static readonly cons = new TLInt(0xfb95c6c4);
    
        static deserialized(_data: ByteStream): InputPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPhoto.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputPhoto(
                id,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong) {}
    
    } // class InputPhoto
    

    export class InputFileLocation implements TLObject {
        static readonly cons = new TLInt(0x14637196);
    
        static deserialized(_data: ByteStream): InputFileLocation | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputFileLocation.cons)) return undefined;
            const volumeId = TLLong.deserialized(_data);
            if (!volumeId) return undefined;
            const localId = TLInt.deserialized(_data);
            if (!localId) return undefined;
            const secret = TLLong.deserialized(_data);
            if (!secret) return undefined;
            return new InputFileLocation(
                volumeId,
                localId,
                secret)
        }
    
        serialized(): Uint8Array {
            const constructor = InputFileLocation.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.volumeId.serialized());
            data.push(this.localId.serialized());
            data.push(this.secret.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly volumeId: TLLong,
            readonly localId: TLInt,
            readonly secret: TLLong) {}
    
    } // class InputFileLocation
    

    export class InputEncryptedFileLocation implements TLObject {
        static readonly cons = new TLInt(0xf5235d55);
    
        static deserialized(_data: ByteStream): InputEncryptedFileLocation | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputEncryptedFileLocation.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputEncryptedFileLocation(
                id,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputEncryptedFileLocation.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong) {}
    
    } // class InputEncryptedFileLocation
    

    export class InputDocumentFileLocation implements TLObject {
        static readonly cons = new TLInt(0x430f0724);
    
        static deserialized(_data: ByteStream): InputDocumentFileLocation | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputDocumentFileLocation.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            return new InputDocumentFileLocation(
                id,
                accessHash,
                version)
        }
    
        serialized(): Uint8Array {
            const constructor = InputDocumentFileLocation.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.version.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong,
            readonly version: TLInt) {}
    
    } // class InputDocumentFileLocation
    

    export class InputAppEvent implements TLObject {
        static readonly cons = new TLInt(0x770656a8);
    
        static deserialized(_data: ByteStream): InputAppEvent | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputAppEvent.cons)) return undefined;
            const time = TLDouble.deserialized(_data);
            if (!time) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            const peer = TLLong.deserialized(_data);
            if (!peer) return undefined;
            const data = TLString.deserialized(_data);
            if (!data) return undefined;
            return new InputAppEvent(
                time,
                type,
                peer,
                data)
        }
    
        serialized(): Uint8Array {
            const constructor = InputAppEvent.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.time.serialized());
            data.push(this.type.serialized());
            data.push(this.peer.serialized());
            data.push(this.data.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly time: TLDouble,
            readonly type: TLString,
            readonly peer: TLLong,
            readonly data: TLString) {}
    
    } // class InputAppEvent
    

    export class PeerUser implements TLObject {
        static readonly cons = new TLInt(0x9db1bc6d);
    
        static deserialized(_data: ByteStream): PeerUser | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PeerUser.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            return new PeerUser(
                userId)
        }
    
        serialized(): Uint8Array {
            const constructor = PeerUser.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt) {}
    
    } // class PeerUser
    

    export class PeerChat implements TLObject {
        static readonly cons = new TLInt(0xbad0e5bb);
    
        static deserialized(_data: ByteStream): PeerChat | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PeerChat.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            return new PeerChat(
                chatId)
        }
    
        serialized(): Uint8Array {
            const constructor = PeerChat.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt) {}
    
    } // class PeerChat
    

    export class PeerChannel implements TLObject {
        static readonly cons = new TLInt(0xbddde532);
    
        static deserialized(_data: ByteStream): PeerChannel | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PeerChannel.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            return new PeerChannel(
                channelId)
        }
    
        serialized(): Uint8Array {
            const constructor = PeerChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt) {}
    
    } // class PeerChannel
    

    export namespace storage {
    export class FileUnknown implements TLObject {
        static readonly cons = new TLInt(0xaa963b05);
    
        static deserialized(_data: ByteStream): FileUnknown | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FileUnknown.cons)) return undefined;
            return new FileUnknown()
        }
    
        serialized(): Uint8Array {
            const constructor = FileUnknown.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FileUnknown
    } // namespace storage

    export namespace storage {
    export class FileJpeg implements TLObject {
        static readonly cons = new TLInt(0x7efe0e);
    
        static deserialized(_data: ByteStream): FileJpeg | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FileJpeg.cons)) return undefined;
            return new FileJpeg()
        }
    
        serialized(): Uint8Array {
            const constructor = FileJpeg.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FileJpeg
    } // namespace storage

    export namespace storage {
    export class FileGif implements TLObject {
        static readonly cons = new TLInt(0xcae1aadf);
    
        static deserialized(_data: ByteStream): FileGif | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FileGif.cons)) return undefined;
            return new FileGif()
        }
    
        serialized(): Uint8Array {
            const constructor = FileGif.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FileGif
    } // namespace storage

    export namespace storage {
    export class FilePng implements TLObject {
        static readonly cons = new TLInt(0xa4f63c0);
    
        static deserialized(_data: ByteStream): FilePng | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FilePng.cons)) return undefined;
            return new FilePng()
        }
    
        serialized(): Uint8Array {
            const constructor = FilePng.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FilePng
    } // namespace storage

    export namespace storage {
    export class FilePdf implements TLObject {
        static readonly cons = new TLInt(0xae1e508d);
    
        static deserialized(_data: ByteStream): FilePdf | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FilePdf.cons)) return undefined;
            return new FilePdf()
        }
    
        serialized(): Uint8Array {
            const constructor = FilePdf.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FilePdf
    } // namespace storage

    export namespace storage {
    export class FileMp3 implements TLObject {
        static readonly cons = new TLInt(0x528a0677);
    
        static deserialized(_data: ByteStream): FileMp3 | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FileMp3.cons)) return undefined;
            return new FileMp3()
        }
    
        serialized(): Uint8Array {
            const constructor = FileMp3.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FileMp3
    } // namespace storage

    export namespace storage {
    export class FileMov implements TLObject {
        static readonly cons = new TLInt(0x4b09ebbc);
    
        static deserialized(_data: ByteStream): FileMov | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FileMov.cons)) return undefined;
            return new FileMov()
        }
    
        serialized(): Uint8Array {
            const constructor = FileMov.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FileMov
    } // namespace storage

    export namespace storage {
    export class FilePartial implements TLObject {
        static readonly cons = new TLInt(0x40bc6f52);
    
        static deserialized(_data: ByteStream): FilePartial | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FilePartial.cons)) return undefined;
            return new FilePartial()
        }
    
        serialized(): Uint8Array {
            const constructor = FilePartial.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FilePartial
    } // namespace storage

    export namespace storage {
    export class FileMp4 implements TLObject {
        static readonly cons = new TLInt(0xb3cea0e4);
    
        static deserialized(_data: ByteStream): FileMp4 | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FileMp4.cons)) return undefined;
            return new FileMp4()
        }
    
        serialized(): Uint8Array {
            const constructor = FileMp4.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FileMp4
    } // namespace storage

    export namespace storage {
    export class FileWebp implements TLObject {
        static readonly cons = new TLInt(0x1081464c);
    
        static deserialized(_data: ByteStream): FileWebp | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FileWebp.cons)) return undefined;
            return new FileWebp()
        }
    
        serialized(): Uint8Array {
            const constructor = FileWebp.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FileWebp
    } // namespace storage

    export class FileLocationUnavailable implements TLObject {
        static readonly cons = new TLInt(0x7c596b46);
    
        static deserialized(_data: ByteStream): FileLocationUnavailable | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FileLocationUnavailable.cons)) return undefined;
            const volumeId = TLLong.deserialized(_data);
            if (!volumeId) return undefined;
            const localId = TLInt.deserialized(_data);
            if (!localId) return undefined;
            const secret = TLLong.deserialized(_data);
            if (!secret) return undefined;
            return new FileLocationUnavailable(
                volumeId,
                localId,
                secret)
        }
    
        serialized(): Uint8Array {
            const constructor = FileLocationUnavailable.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.volumeId.serialized());
            data.push(this.localId.serialized());
            data.push(this.secret.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly volumeId: TLLong,
            readonly localId: TLInt,
            readonly secret: TLLong) {}
    
    } // class FileLocationUnavailable
    

    export class FileLocation implements TLObject {
        static readonly cons = new TLInt(0x53d69076);
    
        static deserialized(_data: ByteStream): FileLocation | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FileLocation.cons)) return undefined;
            const dcId = TLInt.deserialized(_data);
            if (!dcId) return undefined;
            const volumeId = TLLong.deserialized(_data);
            if (!volumeId) return undefined;
            const localId = TLInt.deserialized(_data);
            if (!localId) return undefined;
            const secret = TLLong.deserialized(_data);
            if (!secret) return undefined;
            return new FileLocation(
                dcId,
                volumeId,
                localId,
                secret)
        }
    
        serialized(): Uint8Array {
            const constructor = FileLocation.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.dcId.serialized());
            data.push(this.volumeId.serialized());
            data.push(this.localId.serialized());
            data.push(this.secret.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly dcId: TLInt,
            readonly volumeId: TLLong,
            readonly localId: TLInt,
            readonly secret: TLLong) {}
    
    } // class FileLocation
    

    export class UserEmpty implements TLObject {
        static readonly cons = new TLInt(0x200250ba);
    
        static deserialized(_data: ByteStream): UserEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserEmpty.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            return new UserEmpty(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = UserEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt) {}
    
    } // class UserEmpty
    

    export class User implements TLObject {
        static readonly cons = new TLInt(0xd10d979a);
    
        static deserialized(_data: ByteStream): User | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(User.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const self = (flags.value & 1024) !== 0;
            const contact = (flags.value & 2048) !== 0;
            const mutualContact = (flags.value & 4096) !== 0;
            const deleted = (flags.value & 8192) !== 0;
            const bot = (flags.value & 16384) !== 0;
            const botChatHistory = (flags.value & 32768) !== 0;
            const botNochats = (flags.value & 65536) !== 0;
            const verified = (flags.value & 131072) !== 0;
            const restricted = (flags.value & 262144) !== 0;
            const min = (flags.value & 1048576) !== 0;
            const botInlineGeo = (flags.value & 2097152) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            let accessHash: TLLong | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLLong.deserialized(_data);
                if (!obj) return undefined;
                accessHash = obj
            }
            let firstName: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                firstName = obj
            }
            let lastName: TLString | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                lastName = obj
            }
            let username: TLString | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                username = obj
            }
            let phone: TLString | undefined;
            if ((flags.value & 16) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                phone = obj
            }
            let photo: UserProfilePhotoType | undefined;
            if ((flags.value & 32) !== 0) {
                const obj = deserializedObject(_data) as UserProfilePhotoType;
                if (!obj) return undefined;
                photo = obj
            }
            let status: UserStatusType | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = deserializedObject(_data) as UserStatusType;
                if (!obj) return undefined;
                status = obj
            }
            let botInfoVersion: TLInt | undefined;
            if ((flags.value & 16384) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                botInfoVersion = obj
            }
            let restrictionReason: TLString | undefined;
            if ((flags.value & 262144) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                restrictionReason = obj
            }
            let botInlinePlaceholder: TLString | undefined;
            if ((flags.value & 524288) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                botInlinePlaceholder = obj
            }
            return new User(
                self,
                contact,
                mutualContact,
                deleted,
                bot,
                botChatHistory,
                botNochats,
                verified,
                restricted,
                min,
                botInlineGeo,
                id,
                accessHash,
                firstName,
                lastName,
                username,
                phone,
                photo,
                status,
                botInfoVersion,
                restrictionReason,
                botInlinePlaceholder)
        }
    
        serialized(): Uint8Array {
            const constructor = User.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.self) ? (flags | 1024) : (flags & ~1024);
            flags = (this.contact) ? (flags | 2048) : (flags & ~2048);
            flags = (this.mutualContact) ? (flags | 4096) : (flags & ~4096);
            flags = (this.deleted) ? (flags | 8192) : (flags & ~8192);
            flags = (this.bot) ? (flags | 16384) : (flags & ~16384);
            flags = (this.botChatHistory) ? (flags | 32768) : (flags & ~32768);
            flags = (this.botNochats) ? (flags | 65536) : (flags & ~65536);
            flags = (this.verified) ? (flags | 131072) : (flags & ~131072);
            flags = (this.restricted) ? (flags | 262144) : (flags & ~262144);
            flags = (this.min) ? (flags | 1048576) : (flags & ~1048576);
            flags = (this.botInlineGeo) ? (flags | 2097152) : (flags & ~2097152);
            flags = (!this.accessHash) ? (flags | 1) : (flags & ~1);
            flags = (!this.firstName) ? (flags | 2) : (flags & ~2);
            flags = (!this.lastName) ? (flags | 4) : (flags & ~4);
            flags = (!this.username) ? (flags | 8) : (flags & ~8);
            flags = (!this.phone) ? (flags | 16) : (flags & ~16);
            flags = (!this.photo) ? (flags | 32) : (flags & ~32);
            flags = (!this.status) ? (flags | 64) : (flags & ~64);
            flags = (!this.botInfoVersion) ? (flags | 16384) : (flags & ~16384);
            flags = (!this.restrictionReason) ? (flags | 262144) : (flags & ~262144);
            flags = (!this.botInlinePlaceholder) ? (flags | 524288) : (flags & ~524288);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            if (this.accessHash) data.push(this.accessHash.serialized());
            if (this.firstName) data.push(this.firstName.serialized());
            if (this.lastName) data.push(this.lastName.serialized());
            if (this.username) data.push(this.username.serialized());
            if (this.phone) data.push(this.phone.serialized());
            if (this.photo) data.push(this.photo.serialized());
            if (this.status) data.push(this.status.serialized());
            if (this.botInfoVersion) data.push(this.botInfoVersion.serialized());
            if (this.restrictionReason) data.push(this.restrictionReason.serialized());
            if (this.botInlinePlaceholder) data.push(this.botInlinePlaceholder.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly self: boolean,
            readonly contact: boolean,
            readonly mutualContact: boolean,
            readonly deleted: boolean,
            readonly bot: boolean,
            readonly botChatHistory: boolean,
            readonly botNochats: boolean,
            readonly verified: boolean,
            readonly restricted: boolean,
            readonly min: boolean,
            readonly botInlineGeo: boolean,
            readonly id: TLInt,
            readonly accessHash: TLLong | undefined,
            readonly firstName: TLString | undefined,
            readonly lastName: TLString | undefined,
            readonly username: TLString | undefined,
            readonly phone: TLString | undefined,
            readonly photo: UserProfilePhotoType | undefined,
            readonly status: UserStatusType | undefined,
            readonly botInfoVersion: TLInt | undefined,
            readonly restrictionReason: TLString | undefined,
            readonly botInlinePlaceholder: TLString | undefined) {}
    
    } // class User
    

    export class UserProfilePhotoEmpty implements TLObject {
        static readonly cons = new TLInt(0x4f11bae1);
    
        static deserialized(_data: ByteStream): UserProfilePhotoEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserProfilePhotoEmpty.cons)) return undefined;
            return new UserProfilePhotoEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = UserProfilePhotoEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UserProfilePhotoEmpty
    

    export class UserProfilePhoto implements TLObject {
        static readonly cons = new TLInt(0xd559d8c8);
    
        static deserialized(_data: ByteStream): UserProfilePhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserProfilePhoto.cons)) return undefined;
            const photoId = TLLong.deserialized(_data);
            if (!photoId) return undefined;
            const photoSmall = deserializedObject(_data) as FileLocationType;
            if (!photoSmall) return undefined;
            
            const photoBig = deserializedObject(_data) as FileLocationType;
            if (!photoBig) return undefined;
            
            return new UserProfilePhoto(
                photoId,
                photoSmall,
                photoBig)
        }
    
        serialized(): Uint8Array {
            const constructor = UserProfilePhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.photoId.serialized());
            data.push(this.photoSmall.serialized());
            data.push(this.photoBig.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly photoId: TLLong,
            readonly photoSmall: FileLocationType,
            readonly photoBig: FileLocationType) {}
    
    } // class UserProfilePhoto
    

    export class UserStatusEmpty implements TLObject {
        static readonly cons = new TLInt(0x9d05049);
    
        static deserialized(_data: ByteStream): UserStatusEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserStatusEmpty.cons)) return undefined;
            return new UserStatusEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = UserStatusEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UserStatusEmpty
    

    export class UserStatusOnline implements TLObject {
        static readonly cons = new TLInt(0xedb93949);
    
        static deserialized(_data: ByteStream): UserStatusOnline | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserStatusOnline.cons)) return undefined;
            const expires = TLInt.deserialized(_data);
            if (!expires) return undefined;
            return new UserStatusOnline(
                expires)
        }
    
        serialized(): Uint8Array {
            const constructor = UserStatusOnline.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.expires.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly expires: TLInt) {}
    
    } // class UserStatusOnline
    

    export class UserStatusOffline implements TLObject {
        static readonly cons = new TLInt(0x8c703f);
    
        static deserialized(_data: ByteStream): UserStatusOffline | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserStatusOffline.cons)) return undefined;
            const wasOnline = TLInt.deserialized(_data);
            if (!wasOnline) return undefined;
            return new UserStatusOffline(
                wasOnline)
        }
    
        serialized(): Uint8Array {
            const constructor = UserStatusOffline.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.wasOnline.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly wasOnline: TLInt) {}
    
    } // class UserStatusOffline
    

    export class UserStatusRecently implements TLObject {
        static readonly cons = new TLInt(0xe26f42f1);
    
        static deserialized(_data: ByteStream): UserStatusRecently | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserStatusRecently.cons)) return undefined;
            return new UserStatusRecently()
        }
    
        serialized(): Uint8Array {
            const constructor = UserStatusRecently.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UserStatusRecently
    

    export class UserStatusLastWeek implements TLObject {
        static readonly cons = new TLInt(0x7bf09fc);
    
        static deserialized(_data: ByteStream): UserStatusLastWeek | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserStatusLastWeek.cons)) return undefined;
            return new UserStatusLastWeek()
        }
    
        serialized(): Uint8Array {
            const constructor = UserStatusLastWeek.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UserStatusLastWeek
    

    export class UserStatusLastMonth implements TLObject {
        static readonly cons = new TLInt(0x77ebc742);
    
        static deserialized(_data: ByteStream): UserStatusLastMonth | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserStatusLastMonth.cons)) return undefined;
            return new UserStatusLastMonth()
        }
    
        serialized(): Uint8Array {
            const constructor = UserStatusLastMonth.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UserStatusLastMonth
    

    export class ChatEmpty implements TLObject {
        static readonly cons = new TLInt(0x9ba2d800);
    
        static deserialized(_data: ByteStream): ChatEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatEmpty.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            return new ChatEmpty(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt) {}
    
    } // class ChatEmpty
    

    export class Chat implements TLObject {
        static readonly cons = new TLInt(0xd91cdd54);
    
        static deserialized(_data: ByteStream): Chat | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Chat.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const creator = (flags.value & 1) !== 0;
            const kicked = (flags.value & 2) !== 0;
            const left = (flags.value & 4) !== 0;
            const adminsEnabled = (flags.value & 8) !== 0;
            const admin = (flags.value & 16) !== 0;
            const deactivated = (flags.value & 32) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const photo = deserializedObject(_data) as ChatPhotoType;
            if (!photo) return undefined;
            
            const participantsCount = TLInt.deserialized(_data);
            if (!participantsCount) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            let migratedTo: InputChannelType | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = deserializedObject(_data) as InputChannelType;
                if (!obj) return undefined;
                migratedTo = obj
            }
            return new Chat(
                creator,
                kicked,
                left,
                adminsEnabled,
                admin,
                deactivated,
                id,
                title,
                photo,
                participantsCount,
                date,
                version,
                migratedTo)
        }
    
        serialized(): Uint8Array {
            const constructor = Chat.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.creator) ? (flags | 1) : (flags & ~1);
            flags = (this.kicked) ? (flags | 2) : (flags & ~2);
            flags = (this.left) ? (flags | 4) : (flags & ~4);
            flags = (this.adminsEnabled) ? (flags | 8) : (flags & ~8);
            flags = (this.admin) ? (flags | 16) : (flags & ~16);
            flags = (this.deactivated) ? (flags | 32) : (flags & ~32);
            flags = (!this.migratedTo) ? (flags | 64) : (flags & ~64);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.title.serialized());
            data.push(this.photo.serialized());
            data.push(this.participantsCount.serialized());
            data.push(this.date.serialized());
            data.push(this.version.serialized());
            if (this.migratedTo) data.push(this.migratedTo.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly creator: boolean,
            readonly kicked: boolean,
            readonly left: boolean,
            readonly adminsEnabled: boolean,
            readonly admin: boolean,
            readonly deactivated: boolean,
            readonly id: TLInt,
            readonly title: TLString,
            readonly photo: ChatPhotoType,
            readonly participantsCount: TLInt,
            readonly date: TLInt,
            readonly version: TLInt,
            readonly migratedTo: InputChannelType | undefined) {}
    
    } // class Chat
    

    export class ChatForbidden implements TLObject {
        static readonly cons = new TLInt(0x7328bdb);
    
        static deserialized(_data: ByteStream): ChatForbidden | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatForbidden.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            return new ChatForbidden(
                id,
                title)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatForbidden.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.title.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly title: TLString) {}
    
    } // class ChatForbidden
    

    export class Channel implements TLObject {
        static readonly cons = new TLInt(0xa14dca52);
    
        static deserialized(_data: ByteStream): Channel | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Channel.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const creator = (flags.value & 1) !== 0;
            const kicked = (flags.value & 2) !== 0;
            const left = (flags.value & 4) !== 0;
            const editor = (flags.value & 8) !== 0;
            const moderator = (flags.value & 16) !== 0;
            const broadcast = (flags.value & 32) !== 0;
            const verified = (flags.value & 128) !== 0;
            const megagroup = (flags.value & 256) !== 0;
            const restricted = (flags.value & 512) !== 0;
            const democracy = (flags.value & 1024) !== 0;
            const signatures = (flags.value & 2048) !== 0;
            const min = (flags.value & 4096) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            let accessHash: TLLong | undefined;
            if ((flags.value & 8192) !== 0) {
                const obj = TLLong.deserialized(_data);
                if (!obj) return undefined;
                accessHash = obj
            }
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            let username: TLString | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                username = obj
            }
            const photo = deserializedObject(_data) as ChatPhotoType;
            if (!photo) return undefined;
            
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            let restrictionReason: TLString | undefined;
            if ((flags.value & 512) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                restrictionReason = obj
            }
            return new Channel(
                creator,
                kicked,
                left,
                editor,
                moderator,
                broadcast,
                verified,
                megagroup,
                restricted,
                democracy,
                signatures,
                min,
                id,
                accessHash,
                title,
                username,
                photo,
                date,
                version,
                restrictionReason)
        }
    
        serialized(): Uint8Array {
            const constructor = Channel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.creator) ? (flags | 1) : (flags & ~1);
            flags = (this.kicked) ? (flags | 2) : (flags & ~2);
            flags = (this.left) ? (flags | 4) : (flags & ~4);
            flags = (this.editor) ? (flags | 8) : (flags & ~8);
            flags = (this.moderator) ? (flags | 16) : (flags & ~16);
            flags = (this.broadcast) ? (flags | 32) : (flags & ~32);
            flags = (this.verified) ? (flags | 128) : (flags & ~128);
            flags = (this.megagroup) ? (flags | 256) : (flags & ~256);
            flags = (this.restricted) ? (flags | 512) : (flags & ~512);
            flags = (this.democracy) ? (flags | 1024) : (flags & ~1024);
            flags = (this.signatures) ? (flags | 2048) : (flags & ~2048);
            flags = (this.min) ? (flags | 4096) : (flags & ~4096);
            flags = (!this.accessHash) ? (flags | 8192) : (flags & ~8192);
            flags = (!this.username) ? (flags | 64) : (flags & ~64);
            flags = (!this.restrictionReason) ? (flags | 512) : (flags & ~512);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            if (this.accessHash) data.push(this.accessHash.serialized());
            data.push(this.title.serialized());
            if (this.username) data.push(this.username.serialized());
            data.push(this.photo.serialized());
            data.push(this.date.serialized());
            data.push(this.version.serialized());
            if (this.restrictionReason) data.push(this.restrictionReason.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly creator: boolean,
            readonly kicked: boolean,
            readonly left: boolean,
            readonly editor: boolean,
            readonly moderator: boolean,
            readonly broadcast: boolean,
            readonly verified: boolean,
            readonly megagroup: boolean,
            readonly restricted: boolean,
            readonly democracy: boolean,
            readonly signatures: boolean,
            readonly min: boolean,
            readonly id: TLInt,
            readonly accessHash: TLLong | undefined,
            readonly title: TLString,
            readonly username: TLString | undefined,
            readonly photo: ChatPhotoType,
            readonly date: TLInt,
            readonly version: TLInt,
            readonly restrictionReason: TLString | undefined) {}
    
    } // class Channel
    

    export class ChannelForbidden implements TLObject {
        static readonly cons = new TLInt(0x8537784f);
    
        static deserialized(_data: ByteStream): ChannelForbidden | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelForbidden.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const broadcast = (flags.value & 32) !== 0;
            const megagroup = (flags.value & 256) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            return new ChannelForbidden(
                broadcast,
                megagroup,
                id,
                accessHash,
                title)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelForbidden.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.broadcast) ? (flags | 32) : (flags & ~32);
            flags = (this.megagroup) ? (flags | 256) : (flags & ~256);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.title.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly broadcast: boolean,
            readonly megagroup: boolean,
            readonly id: TLInt,
            readonly accessHash: TLLong,
            readonly title: TLString) {}
    
    } // class ChannelForbidden
    

    export class ChatFull implements TLObject {
        static readonly cons = new TLInt(0x2e02a614);
    
        static deserialized(_data: ByteStream): ChatFull | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatFull.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const participants = deserializedObject(_data) as ChatParticipantsType;
            if (!participants) return undefined;
            
            const chatPhoto = deserializedObject(_data) as PhotoType;
            if (!chatPhoto) return undefined;
            
            const notifySettings = deserializedObject(_data) as PeerNotifySettingsType;
            if (!notifySettings) return undefined;
            
            const exportedInvite = deserializedObject(_data) as ExportedChatInviteType;
            if (!exportedInvite) return undefined;
            
            const botInfo = TLVector.deserialized(_data, BotInfo) as TLVector<BotInfo>;
            if (!botInfo) return undefined;
            return new ChatFull(
                id,
                participants,
                chatPhoto,
                notifySettings,
                exportedInvite,
                botInfo)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatFull.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.participants.serialized());
            data.push(this.chatPhoto.serialized());
            data.push(this.notifySettings.serialized());
            data.push(this.exportedInvite.serialized());
            data.push(this.botInfo.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly participants: ChatParticipantsType,
            readonly chatPhoto: PhotoType,
            readonly notifySettings: PeerNotifySettingsType,
            readonly exportedInvite: ExportedChatInviteType,
            readonly botInfo: TLVector<BotInfo>) {}
    
    } // class ChatFull
    

    export class ChannelFull implements TLObject {
        static readonly cons = new TLInt(0xc3d5512f);
    
        static deserialized(_data: ByteStream): ChannelFull | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelFull.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const canViewParticipants = (flags.value & 8) !== 0;
            const canSetUsername = (flags.value & 64) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const about = TLString.deserialized(_data);
            if (!about) return undefined;
            let participantsCount: TLInt | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                participantsCount = obj
            }
            let adminsCount: TLInt | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                adminsCount = obj
            }
            let kickedCount: TLInt | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                kickedCount = obj
            }
            const readInboxMaxId = TLInt.deserialized(_data);
            if (!readInboxMaxId) return undefined;
            const readOutboxMaxId = TLInt.deserialized(_data);
            if (!readOutboxMaxId) return undefined;
            const unreadCount = TLInt.deserialized(_data);
            if (!unreadCount) return undefined;
            const chatPhoto = deserializedObject(_data) as PhotoType;
            if (!chatPhoto) return undefined;
            
            const notifySettings = deserializedObject(_data) as PeerNotifySettingsType;
            if (!notifySettings) return undefined;
            
            const exportedInvite = deserializedObject(_data) as ExportedChatInviteType;
            if (!exportedInvite) return undefined;
            
            const botInfo = TLVector.deserialized(_data, BotInfo) as TLVector<BotInfo>;
            if (!botInfo) return undefined;
            let migratedFromChatId: TLInt | undefined;
            if ((flags.value & 16) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                migratedFromChatId = obj
            }
            let migratedFromMaxId: TLInt | undefined;
            if ((flags.value & 16) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                migratedFromMaxId = obj
            }
            let pinnedMsgId: TLInt | undefined;
            if ((flags.value & 32) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                pinnedMsgId = obj
            }
            return new ChannelFull(
                canViewParticipants,
                canSetUsername,
                id,
                about,
                participantsCount,
                adminsCount,
                kickedCount,
                readInboxMaxId,
                readOutboxMaxId,
                unreadCount,
                chatPhoto,
                notifySettings,
                exportedInvite,
                botInfo,
                migratedFromChatId,
                migratedFromMaxId,
                pinnedMsgId)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelFull.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.canViewParticipants) ? (flags | 8) : (flags & ~8);
            flags = (this.canSetUsername) ? (flags | 64) : (flags & ~64);
            flags = (!this.participantsCount) ? (flags | 1) : (flags & ~1);
            flags = (!this.adminsCount) ? (flags | 2) : (flags & ~2);
            flags = (!this.kickedCount) ? (flags | 4) : (flags & ~4);
            flags = (!this.migratedFromChatId) ? (flags | 16) : (flags & ~16);
            flags = (!this.migratedFromMaxId) ? (flags | 16) : (flags & ~16);
            flags = (!this.pinnedMsgId) ? (flags | 32) : (flags & ~32);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.about.serialized());
            if (this.participantsCount) data.push(this.participantsCount.serialized());
            if (this.adminsCount) data.push(this.adminsCount.serialized());
            if (this.kickedCount) data.push(this.kickedCount.serialized());
            data.push(this.readInboxMaxId.serialized());
            data.push(this.readOutboxMaxId.serialized());
            data.push(this.unreadCount.serialized());
            data.push(this.chatPhoto.serialized());
            data.push(this.notifySettings.serialized());
            data.push(this.exportedInvite.serialized());
            data.push(this.botInfo.serialized());
            if (this.migratedFromChatId) data.push(this.migratedFromChatId.serialized());
            if (this.migratedFromMaxId) data.push(this.migratedFromMaxId.serialized());
            if (this.pinnedMsgId) data.push(this.pinnedMsgId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly canViewParticipants: boolean,
            readonly canSetUsername: boolean,
            readonly id: TLInt,
            readonly about: TLString,
            readonly participantsCount: TLInt | undefined,
            readonly adminsCount: TLInt | undefined,
            readonly kickedCount: TLInt | undefined,
            readonly readInboxMaxId: TLInt,
            readonly readOutboxMaxId: TLInt,
            readonly unreadCount: TLInt,
            readonly chatPhoto: PhotoType,
            readonly notifySettings: PeerNotifySettingsType,
            readonly exportedInvite: ExportedChatInviteType,
            readonly botInfo: TLVector<BotInfo>,
            readonly migratedFromChatId: TLInt | undefined,
            readonly migratedFromMaxId: TLInt | undefined,
            readonly pinnedMsgId: TLInt | undefined) {}
    
    } // class ChannelFull
    

    export class ChatParticipant implements TLObject {
        static readonly cons = new TLInt(0xc8d7493e);
    
        static deserialized(_data: ByteStream): ChatParticipant | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatParticipant.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const inviterId = TLInt.deserialized(_data);
            if (!inviterId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new ChatParticipant(
                userId,
                inviterId,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatParticipant.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.inviterId.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly inviterId: TLInt,
            readonly date: TLInt) {}
    
    } // class ChatParticipant
    

    export class ChatParticipantCreator implements TLObject {
        static readonly cons = new TLInt(0xda13538a);
    
        static deserialized(_data: ByteStream): ChatParticipantCreator | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatParticipantCreator.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            return new ChatParticipantCreator(
                userId)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatParticipantCreator.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt) {}
    
    } // class ChatParticipantCreator
    

    export class ChatParticipantAdmin implements TLObject {
        static readonly cons = new TLInt(0xe2d6e436);
    
        static deserialized(_data: ByteStream): ChatParticipantAdmin | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatParticipantAdmin.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const inviterId = TLInt.deserialized(_data);
            if (!inviterId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new ChatParticipantAdmin(
                userId,
                inviterId,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatParticipantAdmin.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.inviterId.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly inviterId: TLInt,
            readonly date: TLInt) {}
    
    } // class ChatParticipantAdmin
    

    export class ChatParticipantsForbidden implements TLObject {
        static readonly cons = new TLInt(0xfc900c2b);
    
        static deserialized(_data: ByteStream): ChatParticipantsForbidden | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatParticipantsForbidden.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            let selfParticipant: ChatParticipantType | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = deserializedObject(_data) as ChatParticipantType;
                if (!obj) return undefined;
                selfParticipant = obj
            }
            return new ChatParticipantsForbidden(
                chatId,
                selfParticipant)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatParticipantsForbidden.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.selfParticipant) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.chatId.serialized());
            if (this.selfParticipant) data.push(this.selfParticipant.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly selfParticipant: ChatParticipantType | undefined) {}
    
    } // class ChatParticipantsForbidden
    

    export class ChatParticipants implements TLObject {
        static readonly cons = new TLInt(0x3f460fed);
    
        static deserialized(_data: ByteStream): ChatParticipants | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatParticipants.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const participants = TLVector.deserialized(_data, ) as TLVector<ChatParticipantType>;
            if (!participants) return undefined;
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            return new ChatParticipants(
                chatId,
                participants,
                version)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatParticipants.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.participants.serialized());
            data.push(this.version.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly participants: TLVector<ChatParticipantType>,
            readonly version: TLInt) {}
    
    } // class ChatParticipants
    

    export class ChatPhotoEmpty implements TLObject {
        static readonly cons = new TLInt(0x37c1011c);
    
        static deserialized(_data: ByteStream): ChatPhotoEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatPhotoEmpty.cons)) return undefined;
            return new ChatPhotoEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = ChatPhotoEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChatPhotoEmpty
    

    export class ChatPhoto implements TLObject {
        static readonly cons = new TLInt(0x6153276a);
    
        static deserialized(_data: ByteStream): ChatPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatPhoto.cons)) return undefined;
            const photoSmall = deserializedObject(_data) as FileLocationType;
            if (!photoSmall) return undefined;
            
            const photoBig = deserializedObject(_data) as FileLocationType;
            if (!photoBig) return undefined;
            
            return new ChatPhoto(
                photoSmall,
                photoBig)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.photoSmall.serialized());
            data.push(this.photoBig.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly photoSmall: FileLocationType,
            readonly photoBig: FileLocationType) {}
    
    } // class ChatPhoto
    

    export class MessageEmpty implements TLObject {
        static readonly cons = new TLInt(0x83e5de54);
    
        static deserialized(_data: ByteStream): MessageEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEmpty.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            return new MessageEmpty(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt) {}
    
    } // class MessageEmpty
    

    export class Message implements TLObject {
        static readonly cons = new TLInt(0xc09be45f);
    
        static deserialized(_data: ByteStream): Message | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Message.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const out = (flags.value & 2) !== 0;
            const mentioned = (flags.value & 16) !== 0;
            const mediaUnread = (flags.value & 32) !== 0;
            const silent = (flags.value & 8192) !== 0;
            const post = (flags.value & 16384) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            let fromId: TLInt | undefined;
            if ((flags.value & 256) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                fromId = obj
            }
            const toId = deserializedObject(_data) as PeerType;
            if (!toId) return undefined;
            
            let fwdFrom: MessageFwdHeader | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as MessageFwdHeader;
                if (!obj) return undefined;
                fwdFrom = obj
            }
            let viaBotId: TLInt | undefined;
            if ((flags.value & 2048) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                viaBotId = obj
            }
            let replyToMsgId: TLInt | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                replyToMsgId = obj
            }
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const message = TLString.deserialized(_data);
            if (!message) return undefined;
            let media: MessageMediaType | undefined;
            if ((flags.value & 512) !== 0) {
                const obj = deserializedObject(_data) as MessageMediaType;
                if (!obj) return undefined;
                media = obj
            }
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            let entities: TLVector<MessageEntityType> | undefined;
            if ((flags.value & 128) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<MessageEntityType>;
                if (!obj) return undefined;
                entities = obj
            }
            let views: TLInt | undefined;
            if ((flags.value & 1024) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                views = obj
            }
            let editDate: TLInt | undefined;
            if ((flags.value & 32768) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                editDate = obj
            }
            return new Message(
                out,
                mentioned,
                mediaUnread,
                silent,
                post,
                id,
                fromId,
                toId,
                fwdFrom,
                viaBotId,
                replyToMsgId,
                date,
                message,
                media,
                replyMarkup,
                entities,
                views,
                editDate)
        }
    
        serialized(): Uint8Array {
            const constructor = Message.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.out) ? (flags | 2) : (flags & ~2);
            flags = (this.mentioned) ? (flags | 16) : (flags & ~16);
            flags = (this.mediaUnread) ? (flags | 32) : (flags & ~32);
            flags = (this.silent) ? (flags | 8192) : (flags & ~8192);
            flags = (this.post) ? (flags | 16384) : (flags & ~16384);
            flags = (!this.fromId) ? (flags | 256) : (flags & ~256);
            flags = (!this.fwdFrom) ? (flags | 4) : (flags & ~4);
            flags = (!this.viaBotId) ? (flags | 2048) : (flags & ~2048);
            flags = (!this.replyToMsgId) ? (flags | 8) : (flags & ~8);
            flags = (!this.media) ? (flags | 512) : (flags & ~512);
            flags = (!this.replyMarkup) ? (flags | 64) : (flags & ~64);
            flags = (!this.entities) ? (flags | 128) : (flags & ~128);
            flags = (!this.views) ? (flags | 1024) : (flags & ~1024);
            flags = (!this.editDate) ? (flags | 32768) : (flags & ~32768);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            if (this.fromId) data.push(this.fromId.serialized());
            data.push(this.toId.serialized());
            if (this.fwdFrom) data.push(this.fwdFrom.serialized());
            if (this.viaBotId) data.push(this.viaBotId.serialized());
            if (this.replyToMsgId) data.push(this.replyToMsgId.serialized());
            data.push(this.date.serialized());
            data.push(this.message.serialized());
            if (this.media) data.push(this.media.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
            if (this.entities) data.push(this.entities.serialized());
            if (this.views) data.push(this.views.serialized());
            if (this.editDate) data.push(this.editDate.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly out: boolean,
            readonly mentioned: boolean,
            readonly mediaUnread: boolean,
            readonly silent: boolean,
            readonly post: boolean,
            readonly id: TLInt,
            readonly fromId: TLInt | undefined,
            readonly toId: PeerType,
            readonly fwdFrom: MessageFwdHeader | undefined,
            readonly viaBotId: TLInt | undefined,
            readonly replyToMsgId: TLInt | undefined,
            readonly date: TLInt,
            readonly message: TLString,
            readonly media: MessageMediaType | undefined,
            readonly replyMarkup: ReplyMarkupType | undefined,
            readonly entities: TLVector<MessageEntityType> | undefined,
            readonly views: TLInt | undefined,
            readonly editDate: TLInt | undefined) {}
    
    } // class Message
    

    export class MessageService implements TLObject {
        static readonly cons = new TLInt(0x9e19a1f6);
    
        static deserialized(_data: ByteStream): MessageService | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageService.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const out = (flags.value & 2) !== 0;
            const mentioned = (flags.value & 16) !== 0;
            const mediaUnread = (flags.value & 32) !== 0;
            const silent = (flags.value & 8192) !== 0;
            const post = (flags.value & 16384) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            let fromId: TLInt | undefined;
            if ((flags.value & 256) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                fromId = obj
            }
            const toId = deserializedObject(_data) as PeerType;
            if (!toId) return undefined;
            
            let replyToMsgId: TLInt | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                replyToMsgId = obj
            }
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const action = deserializedObject(_data) as MessageActionType;
            if (!action) return undefined;
            
            return new MessageService(
                out,
                mentioned,
                mediaUnread,
                silent,
                post,
                id,
                fromId,
                toId,
                replyToMsgId,
                date,
                action)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageService.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.out) ? (flags | 2) : (flags & ~2);
            flags = (this.mentioned) ? (flags | 16) : (flags & ~16);
            flags = (this.mediaUnread) ? (flags | 32) : (flags & ~32);
            flags = (this.silent) ? (flags | 8192) : (flags & ~8192);
            flags = (this.post) ? (flags | 16384) : (flags & ~16384);
            flags = (!this.fromId) ? (flags | 256) : (flags & ~256);
            flags = (!this.replyToMsgId) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            if (this.fromId) data.push(this.fromId.serialized());
            data.push(this.toId.serialized());
            if (this.replyToMsgId) data.push(this.replyToMsgId.serialized());
            data.push(this.date.serialized());
            data.push(this.action.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly out: boolean,
            readonly mentioned: boolean,
            readonly mediaUnread: boolean,
            readonly silent: boolean,
            readonly post: boolean,
            readonly id: TLInt,
            readonly fromId: TLInt | undefined,
            readonly toId: PeerType,
            readonly replyToMsgId: TLInt | undefined,
            readonly date: TLInt,
            readonly action: MessageActionType) {}
    
    } // class MessageService
    

    export class MessageMediaEmpty implements TLObject {
        static readonly cons = new TLInt(0x3ded6320);
    
        static deserialized(_data: ByteStream): MessageMediaEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageMediaEmpty.cons)) return undefined;
            return new MessageMediaEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = MessageMediaEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class MessageMediaEmpty
    

    export class MessageMediaPhoto implements TLObject {
        static readonly cons = new TLInt(0x3d8ce53d);
    
        static deserialized(_data: ByteStream): MessageMediaPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageMediaPhoto.cons)) return undefined;
            const photo = deserializedObject(_data) as PhotoType;
            if (!photo) return undefined;
            
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            return new MessageMediaPhoto(
                photo,
                caption)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageMediaPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.photo.serialized());
            data.push(this.caption.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly photo: PhotoType,
            readonly caption: TLString) {}
    
    } // class MessageMediaPhoto
    

    export class MessageMediaGeo implements TLObject {
        static readonly cons = new TLInt(0x56e0d474);
    
        static deserialized(_data: ByteStream): MessageMediaGeo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageMediaGeo.cons)) return undefined;
            const geo = deserializedObject(_data) as GeoPointType;
            if (!geo) return undefined;
            
            return new MessageMediaGeo(
                geo)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageMediaGeo.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.geo.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly geo: GeoPointType) {}
    
    } // class MessageMediaGeo
    

    export class MessageMediaContact implements TLObject {
        static readonly cons = new TLInt(0x5e7d2f39);
    
        static deserialized(_data: ByteStream): MessageMediaContact | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageMediaContact.cons)) return undefined;
            const phoneNumber = TLString.deserialized(_data);
            if (!phoneNumber) return undefined;
            const firstName = TLString.deserialized(_data);
            if (!firstName) return undefined;
            const lastName = TLString.deserialized(_data);
            if (!lastName) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            return new MessageMediaContact(
                phoneNumber,
                firstName,
                lastName,
                userId)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageMediaContact.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumber.serialized());
            data.push(this.firstName.serialized());
            data.push(this.lastName.serialized());
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly firstName: TLString,
            readonly lastName: TLString,
            readonly userId: TLInt) {}
    
    } // class MessageMediaContact
    

    export class MessageMediaUnsupported implements TLObject {
        static readonly cons = new TLInt(0x9f84f49e);
    
        static deserialized(_data: ByteStream): MessageMediaUnsupported | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageMediaUnsupported.cons)) return undefined;
            return new MessageMediaUnsupported()
        }
    
        serialized(): Uint8Array {
            const constructor = MessageMediaUnsupported.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class MessageMediaUnsupported
    

    export class MessageMediaDocument implements TLObject {
        static readonly cons = new TLInt(0xf3e02ea8);
    
        static deserialized(_data: ByteStream): MessageMediaDocument | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageMediaDocument.cons)) return undefined;
            const document = deserializedObject(_data) as DocumentType;
            if (!document) return undefined;
            
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            return new MessageMediaDocument(
                document,
                caption)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageMediaDocument.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.document.serialized());
            data.push(this.caption.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly document: DocumentType,
            readonly caption: TLString) {}
    
    } // class MessageMediaDocument
    

    export class MessageMediaWebPage implements TLObject {
        static readonly cons = new TLInt(0xa32dd600);
    
        static deserialized(_data: ByteStream): MessageMediaWebPage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageMediaWebPage.cons)) return undefined;
            const webpage = deserializedObject(_data) as WebPageType;
            if (!webpage) return undefined;
            
            return new MessageMediaWebPage(
                webpage)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageMediaWebPage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.webpage.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly webpage: WebPageType) {}
    
    } // class MessageMediaWebPage
    

    export class MessageMediaVenue implements TLObject {
        static readonly cons = new TLInt(0x7912b71f);
    
        static deserialized(_data: ByteStream): MessageMediaVenue | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageMediaVenue.cons)) return undefined;
            const geo = deserializedObject(_data) as GeoPointType;
            if (!geo) return undefined;
            
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const address = TLString.deserialized(_data);
            if (!address) return undefined;
            const provider = TLString.deserialized(_data);
            if (!provider) return undefined;
            const venueId = TLString.deserialized(_data);
            if (!venueId) return undefined;
            return new MessageMediaVenue(
                geo,
                title,
                address,
                provider,
                venueId)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageMediaVenue.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.geo.serialized());
            data.push(this.title.serialized());
            data.push(this.address.serialized());
            data.push(this.provider.serialized());
            data.push(this.venueId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly geo: GeoPointType,
            readonly title: TLString,
            readonly address: TLString,
            readonly provider: TLString,
            readonly venueId: TLString) {}
    
    } // class MessageMediaVenue
    

    export class MessageMediaGame implements TLObject {
        static readonly cons = new TLInt(0xfdb19008);
    
        static deserialized(_data: ByteStream): MessageMediaGame | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageMediaGame.cons)) return undefined;
            const game = deserializedObject(_data) as Game;
            if (!game) return undefined;
            
            return new MessageMediaGame(
                game)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageMediaGame.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.game.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly game: Game) {}
    
    } // class MessageMediaGame
    

    export class MessageActionEmpty implements TLObject {
        static readonly cons = new TLInt(0xb6aef7b0);
    
        static deserialized(_data: ByteStream): MessageActionEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionEmpty.cons)) return undefined;
            return new MessageActionEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class MessageActionEmpty
    

    export class MessageActionChatCreate implements TLObject {
        static readonly cons = new TLInt(0xa6638b9a);
    
        static deserialized(_data: ByteStream): MessageActionChatCreate | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChatCreate.cons)) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const users = TLVector.deserialized(_data, TLInt) as TLVector<TLInt>;
            if (!users) return undefined;
            return new MessageActionChatCreate(
                title,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChatCreate.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.title.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly title: TLString,
            readonly users: TLVector<TLInt>) {}
    
    } // class MessageActionChatCreate
    

    export class MessageActionChatEditTitle implements TLObject {
        static readonly cons = new TLInt(0xb5a1ce5a);
    
        static deserialized(_data: ByteStream): MessageActionChatEditTitle | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChatEditTitle.cons)) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            return new MessageActionChatEditTitle(
                title)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChatEditTitle.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.title.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly title: TLString) {}
    
    } // class MessageActionChatEditTitle
    

    export class MessageActionChatEditPhoto implements TLObject {
        static readonly cons = new TLInt(0x7fcb13a8);
    
        static deserialized(_data: ByteStream): MessageActionChatEditPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChatEditPhoto.cons)) return undefined;
            const photo = deserializedObject(_data) as PhotoType;
            if (!photo) return undefined;
            
            return new MessageActionChatEditPhoto(
                photo)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChatEditPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.photo.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly photo: PhotoType) {}
    
    } // class MessageActionChatEditPhoto
    

    export class MessageActionChatDeletePhoto implements TLObject {
        static readonly cons = new TLInt(0x95e3fbef);
    
        static deserialized(_data: ByteStream): MessageActionChatDeletePhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChatDeletePhoto.cons)) return undefined;
            return new MessageActionChatDeletePhoto()
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChatDeletePhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class MessageActionChatDeletePhoto
    

    export class MessageActionChatAddUser implements TLObject {
        static readonly cons = new TLInt(0x488a7337);
    
        static deserialized(_data: ByteStream): MessageActionChatAddUser | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChatAddUser.cons)) return undefined;
            const users = TLVector.deserialized(_data, TLInt) as TLVector<TLInt>;
            if (!users) return undefined;
            return new MessageActionChatAddUser(
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChatAddUser.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly users: TLVector<TLInt>) {}
    
    } // class MessageActionChatAddUser
    

    export class MessageActionChatDeleteUser implements TLObject {
        static readonly cons = new TLInt(0xb2ae9b0c);
    
        static deserialized(_data: ByteStream): MessageActionChatDeleteUser | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChatDeleteUser.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            return new MessageActionChatDeleteUser(
                userId)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChatDeleteUser.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt) {}
    
    } // class MessageActionChatDeleteUser
    

    export class MessageActionChatJoinedByLink implements TLObject {
        static readonly cons = new TLInt(0xf89cf5e8);
    
        static deserialized(_data: ByteStream): MessageActionChatJoinedByLink | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChatJoinedByLink.cons)) return undefined;
            const inviterId = TLInt.deserialized(_data);
            if (!inviterId) return undefined;
            return new MessageActionChatJoinedByLink(
                inviterId)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChatJoinedByLink.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.inviterId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly inviterId: TLInt) {}
    
    } // class MessageActionChatJoinedByLink
    

    export class MessageActionChannelCreate implements TLObject {
        static readonly cons = new TLInt(0x95d2ac92);
    
        static deserialized(_data: ByteStream): MessageActionChannelCreate | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChannelCreate.cons)) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            return new MessageActionChannelCreate(
                title)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChannelCreate.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.title.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly title: TLString) {}
    
    } // class MessageActionChannelCreate
    

    export class MessageActionChatMigrateTo implements TLObject {
        static readonly cons = new TLInt(0x51bdb021);
    
        static deserialized(_data: ByteStream): MessageActionChatMigrateTo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChatMigrateTo.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            return new MessageActionChatMigrateTo(
                channelId)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChatMigrateTo.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt) {}
    
    } // class MessageActionChatMigrateTo
    

    export class MessageActionChannelMigrateFrom implements TLObject {
        static readonly cons = new TLInt(0xb055eaee);
    
        static deserialized(_data: ByteStream): MessageActionChannelMigrateFrom | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionChannelMigrateFrom.cons)) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            return new MessageActionChannelMigrateFrom(
                title,
                chatId)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionChannelMigrateFrom.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.title.serialized());
            data.push(this.chatId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly title: TLString,
            readonly chatId: TLInt) {}
    
    } // class MessageActionChannelMigrateFrom
    

    export class MessageActionPinMessage implements TLObject {
        static readonly cons = new TLInt(0x94bd38ed);
    
        static deserialized(_data: ByteStream): MessageActionPinMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionPinMessage.cons)) return undefined;
            return new MessageActionPinMessage()
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionPinMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class MessageActionPinMessage
    

    export class MessageActionHistoryClear implements TLObject {
        static readonly cons = new TLInt(0x9fbab604);
    
        static deserialized(_data: ByteStream): MessageActionHistoryClear | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionHistoryClear.cons)) return undefined;
            return new MessageActionHistoryClear()
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionHistoryClear.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class MessageActionHistoryClear
    

    export class MessageActionGameScore implements TLObject {
        static readonly cons = new TLInt(0x92a72876);
    
        static deserialized(_data: ByteStream): MessageActionGameScore | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageActionGameScore.cons)) return undefined;
            const gameId = TLLong.deserialized(_data);
            if (!gameId) return undefined;
            const score = TLInt.deserialized(_data);
            if (!score) return undefined;
            return new MessageActionGameScore(
                gameId,
                score)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageActionGameScore.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.gameId.serialized());
            data.push(this.score.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly gameId: TLLong,
            readonly score: TLInt) {}
    
    } // class MessageActionGameScore
    

    export class Dialog implements TLObject {
        static readonly cons = new TLInt(0x66ffba14);
    
        static deserialized(_data: ByteStream): Dialog | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Dialog.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const peer = deserializedObject(_data) as PeerType;
            if (!peer) return undefined;
            
            const topMessage = TLInt.deserialized(_data);
            if (!topMessage) return undefined;
            const readInboxMaxId = TLInt.deserialized(_data);
            if (!readInboxMaxId) return undefined;
            const readOutboxMaxId = TLInt.deserialized(_data);
            if (!readOutboxMaxId) return undefined;
            const unreadCount = TLInt.deserialized(_data);
            if (!unreadCount) return undefined;
            const notifySettings = deserializedObject(_data) as PeerNotifySettingsType;
            if (!notifySettings) return undefined;
            
            let pts: TLInt | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                pts = obj
            }
            let draft: DraftMessageType | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = deserializedObject(_data) as DraftMessageType;
                if (!obj) return undefined;
                draft = obj
            }
            return new Dialog(
                peer,
                topMessage,
                readInboxMaxId,
                readOutboxMaxId,
                unreadCount,
                notifySettings,
                pts,
                draft)
        }
    
        serialized(): Uint8Array {
            const constructor = Dialog.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.pts) ? (flags | 1) : (flags & ~1);
            flags = (!this.draft) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.peer.serialized());
            data.push(this.topMessage.serialized());
            data.push(this.readInboxMaxId.serialized());
            data.push(this.readOutboxMaxId.serialized());
            data.push(this.unreadCount.serialized());
            data.push(this.notifySettings.serialized());
            if (this.pts) data.push(this.pts.serialized());
            if (this.draft) data.push(this.draft.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: PeerType,
            readonly topMessage: TLInt,
            readonly readInboxMaxId: TLInt,
            readonly readOutboxMaxId: TLInt,
            readonly unreadCount: TLInt,
            readonly notifySettings: PeerNotifySettingsType,
            readonly pts: TLInt | undefined,
            readonly draft: DraftMessageType | undefined) {}
    
    } // class Dialog
    

    export class PhotoEmpty implements TLObject {
        static readonly cons = new TLInt(0x2331b22d);
    
        static deserialized(_data: ByteStream): PhotoEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PhotoEmpty.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            return new PhotoEmpty(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = PhotoEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong) {}
    
    } // class PhotoEmpty
    

    export class Photo implements TLObject {
        static readonly cons = new TLInt(0x9288dd29);
    
        static deserialized(_data: ByteStream): Photo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Photo.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const hasStickers = (flags.value & 1) !== 0;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const sizes = TLVector.deserialized(_data, ) as TLVector<PhotoSizeType>;
            if (!sizes) return undefined;
            return new Photo(
                hasStickers,
                id,
                accessHash,
                date,
                sizes)
        }
    
        serialized(): Uint8Array {
            const constructor = Photo.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.hasStickers) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.date.serialized());
            data.push(this.sizes.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hasStickers: boolean,
            readonly id: TLLong,
            readonly accessHash: TLLong,
            readonly date: TLInt,
            readonly sizes: TLVector<PhotoSizeType>) {}
    
    } // class Photo
    

    export class PhotoSizeEmpty implements TLObject {
        static readonly cons = new TLInt(0xe17e23c);
    
        static deserialized(_data: ByteStream): PhotoSizeEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PhotoSizeEmpty.cons)) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            return new PhotoSizeEmpty(
                type)
        }
    
        serialized(): Uint8Array {
            const constructor = PhotoSizeEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.type.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly type: TLString) {}
    
    } // class PhotoSizeEmpty
    

    export class PhotoSize implements TLObject {
        static readonly cons = new TLInt(0x77bfb61b);
    
        static deserialized(_data: ByteStream): PhotoSize | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PhotoSize.cons)) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            const location = deserializedObject(_data) as FileLocationType;
            if (!location) return undefined;
            
            const w = TLInt.deserialized(_data);
            if (!w) return undefined;
            const h = TLInt.deserialized(_data);
            if (!h) return undefined;
            const size = TLInt.deserialized(_data);
            if (!size) return undefined;
            return new PhotoSize(
                type,
                location,
                w,
                h,
                size)
        }
    
        serialized(): Uint8Array {
            const constructor = PhotoSize.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.type.serialized());
            data.push(this.location.serialized());
            data.push(this.w.serialized());
            data.push(this.h.serialized());
            data.push(this.size.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly type: TLString,
            readonly location: FileLocationType,
            readonly w: TLInt,
            readonly h: TLInt,
            readonly size: TLInt) {}
    
    } // class PhotoSize
    

    export class PhotoCachedSize implements TLObject {
        static readonly cons = new TLInt(0xe9a734fa);
    
        static deserialized(_data: ByteStream): PhotoCachedSize | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PhotoCachedSize.cons)) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            const location = deserializedObject(_data) as FileLocationType;
            if (!location) return undefined;
            
            const w = TLInt.deserialized(_data);
            if (!w) return undefined;
            const h = TLInt.deserialized(_data);
            if (!h) return undefined;
            const bytes = TLBytes.deserialized(_data);
            if (!bytes) return undefined;
            return new PhotoCachedSize(
                type,
                location,
                w,
                h,
                bytes)
        }
    
        serialized(): Uint8Array {
            const constructor = PhotoCachedSize.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.type.serialized());
            data.push(this.location.serialized());
            data.push(this.w.serialized());
            data.push(this.h.serialized());
            data.push(this.bytes.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly type: TLString,
            readonly location: FileLocationType,
            readonly w: TLInt,
            readonly h: TLInt,
            readonly bytes: TLBytes) {}
    
    } // class PhotoCachedSize
    

    export class GeoPointEmpty implements TLObject {
        static readonly cons = new TLInt(0x1117dd5f);
    
        static deserialized(_data: ByteStream): GeoPointEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(GeoPointEmpty.cons)) return undefined;
            return new GeoPointEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = GeoPointEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GeoPointEmpty
    

    export class GeoPoint implements TLObject {
        static readonly cons = new TLInt(0x2049d70c);
    
        static deserialized(_data: ByteStream): GeoPoint | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(GeoPoint.cons)) return undefined;
            const long = TLDouble.deserialized(_data);
            if (!long) return undefined;
            const lat = TLDouble.deserialized(_data);
            if (!lat) return undefined;
            return new GeoPoint(
                long,
                lat)
        }
    
        serialized(): Uint8Array {
            const constructor = GeoPoint.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.long.serialized());
            data.push(this.lat.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly long: TLDouble,
            readonly lat: TLDouble) {}
    
    } // class GeoPoint
    

    export namespace auth {
    export class CheckedPhone implements TLObject {
        static readonly cons = new TLInt(0x811ea28e);
    
        static deserialized(_data: ByteStream): CheckedPhone | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(CheckedPhone.cons)) return undefined;
            const phoneRegistered = deserializedObject(_data) as BoolType;
            if (!phoneRegistered) return undefined;
            
            return new CheckedPhone(
                phoneRegistered)
        }
    
        serialized(): Uint8Array {
            const constructor = CheckedPhone.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneRegistered.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneRegistered: BoolType) {}
    
    } // class CheckedPhone
    } // namespace auth

    export namespace auth {
    export class SentCode implements TLObject {
        static readonly cons = new TLInt(0x5e002502);
    
        static deserialized(_data: ByteStream): SentCode | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SentCode.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const phoneRegistered = (flags.value & 1) !== 0;
            const type = deserializedObject(_data) as auth.SentCodeTypeType;
            if (!type) return undefined;
            
            const phoneCodeHash = TLString.deserialized(_data);
            if (!phoneCodeHash) return undefined;
            let nextType: auth.CodeTypeType | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = deserializedObject(_data) as auth.CodeTypeType;
                if (!obj) return undefined;
                nextType = obj
            }
            let timeout: TLInt | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                timeout = obj
            }
            return new SentCode(
                phoneRegistered,
                type,
                phoneCodeHash,
                nextType,
                timeout)
        }
    
        serialized(): Uint8Array {
            const constructor = SentCode.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.phoneRegistered) ? (flags | 1) : (flags & ~1);
            flags = (!this.nextType) ? (flags | 2) : (flags & ~2);
            flags = (!this.timeout) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.type.serialized());
            data.push(this.phoneCodeHash.serialized());
            if (this.nextType) data.push(this.nextType.serialized());
            if (this.timeout) data.push(this.timeout.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneRegistered: boolean,
            readonly type: auth.SentCodeTypeType,
            readonly phoneCodeHash: TLString,
            readonly nextType: auth.CodeTypeType | undefined,
            readonly timeout: TLInt | undefined) {}
    
    } // class SentCode
    } // namespace auth

    export namespace auth {
    export class Authorization implements TLObject {
        static readonly cons = new TLInt(0xcd050916);
    
        static deserialized(_data: ByteStream): Authorization | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Authorization.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            let tmpSessions: TLInt | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                tmpSessions = obj
            }
            const user = deserializedObject(_data) as UserType;
            if (!user) return undefined;
            
            return new Authorization(
                tmpSessions,
                user)
        }
    
        serialized(): Uint8Array {
            const constructor = Authorization.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.tmpSessions) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            if (this.tmpSessions) data.push(this.tmpSessions.serialized());
            data.push(this.user.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly tmpSessions: TLInt | undefined,
            readonly user: UserType) {}
    
    } // class Authorization
    } // namespace auth

    export namespace auth {
    export class ExportedAuthorization implements TLObject {
        static readonly cons = new TLInt(0xdf969c2d);
    
        static deserialized(_data: ByteStream): ExportedAuthorization | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ExportedAuthorization.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const bytes = TLBytes.deserialized(_data);
            if (!bytes) return undefined;
            return new ExportedAuthorization(
                id,
                bytes)
        }
    
        serialized(): Uint8Array {
            const constructor = ExportedAuthorization.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.bytes.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly bytes: TLBytes) {}
    
    } // class ExportedAuthorization
    } // namespace auth

    export class InputNotifyPeer implements TLObject {
        static readonly cons = new TLInt(0xb8bc5b0c);
    
        static deserialized(_data: ByteStream): InputNotifyPeer | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputNotifyPeer.cons)) return undefined;
            const peer = deserializedObject(_data) as InputPeerType;
            if (!peer) return undefined;
            
            return new InputNotifyPeer(
                peer)
        }
    
        serialized(): Uint8Array {
            const constructor = InputNotifyPeer.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType) {}
    
    } // class InputNotifyPeer
    

    export class InputNotifyUsers implements TLObject {
        static readonly cons = new TLInt(0x193b4417);
    
        static deserialized(_data: ByteStream): InputNotifyUsers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputNotifyUsers.cons)) return undefined;
            return new InputNotifyUsers()
        }
    
        serialized(): Uint8Array {
            const constructor = InputNotifyUsers.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputNotifyUsers
    

    export class InputNotifyChats implements TLObject {
        static readonly cons = new TLInt(0x4a95e84e);
    
        static deserialized(_data: ByteStream): InputNotifyChats | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputNotifyChats.cons)) return undefined;
            return new InputNotifyChats()
        }
    
        serialized(): Uint8Array {
            const constructor = InputNotifyChats.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputNotifyChats
    

    export class InputNotifyAll implements TLObject {
        static readonly cons = new TLInt(0xa429b886);
    
        static deserialized(_data: ByteStream): InputNotifyAll | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputNotifyAll.cons)) return undefined;
            return new InputNotifyAll()
        }
    
        serialized(): Uint8Array {
            const constructor = InputNotifyAll.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputNotifyAll
    

    export class InputPeerNotifyEventsEmpty implements TLObject {
        static readonly cons = new TLInt(0xf03064d8);
    
        static deserialized(_data: ByteStream): InputPeerNotifyEventsEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPeerNotifyEventsEmpty.cons)) return undefined;
            return new InputPeerNotifyEventsEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPeerNotifyEventsEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPeerNotifyEventsEmpty
    

    export class InputPeerNotifyEventsAll implements TLObject {
        static readonly cons = new TLInt(0xe86a2c74);
    
        static deserialized(_data: ByteStream): InputPeerNotifyEventsAll | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPeerNotifyEventsAll.cons)) return undefined;
            return new InputPeerNotifyEventsAll()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPeerNotifyEventsAll.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPeerNotifyEventsAll
    

    export class InputPeerNotifySettings implements TLObject {
        static readonly cons = new TLInt(0x38935eb2);
    
        static deserialized(_data: ByteStream): InputPeerNotifySettings | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPeerNotifySettings.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const showPreviews = (flags.value & 1) !== 0;
            const silent = (flags.value & 2) !== 0;
            const muteUntil = TLInt.deserialized(_data);
            if (!muteUntil) return undefined;
            const sound = TLString.deserialized(_data);
            if (!sound) return undefined;
            return new InputPeerNotifySettings(
                showPreviews,
                silent,
                muteUntil,
                sound)
        }
    
        serialized(): Uint8Array {
            const constructor = InputPeerNotifySettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.showPreviews) ? (flags | 1) : (flags & ~1);
            flags = (this.silent) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.muteUntil.serialized());
            data.push(this.sound.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly showPreviews: boolean,
            readonly silent: boolean,
            readonly muteUntil: TLInt,
            readonly sound: TLString) {}
    
    } // class InputPeerNotifySettings
    

    export class PeerNotifyEventsEmpty implements TLObject {
        static readonly cons = new TLInt(0xadd53cb3);
    
        static deserialized(_data: ByteStream): PeerNotifyEventsEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PeerNotifyEventsEmpty.cons)) return undefined;
            return new PeerNotifyEventsEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = PeerNotifyEventsEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class PeerNotifyEventsEmpty
    

    export class PeerNotifyEventsAll implements TLObject {
        static readonly cons = new TLInt(0x6d1ded88);
    
        static deserialized(_data: ByteStream): PeerNotifyEventsAll | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PeerNotifyEventsAll.cons)) return undefined;
            return new PeerNotifyEventsAll()
        }
    
        serialized(): Uint8Array {
            const constructor = PeerNotifyEventsAll.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class PeerNotifyEventsAll
    

    export class PeerNotifySettingsEmpty implements TLObject {
        static readonly cons = new TLInt(0x70a68512);
    
        static deserialized(_data: ByteStream): PeerNotifySettingsEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PeerNotifySettingsEmpty.cons)) return undefined;
            return new PeerNotifySettingsEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = PeerNotifySettingsEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class PeerNotifySettingsEmpty
    

    export class PeerNotifySettings implements TLObject {
        static readonly cons = new TLInt(0x9acda4c0);
    
        static deserialized(_data: ByteStream): PeerNotifySettings | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PeerNotifySettings.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const showPreviews = (flags.value & 1) !== 0;
            const silent = (flags.value & 2) !== 0;
            const muteUntil = TLInt.deserialized(_data);
            if (!muteUntil) return undefined;
            const sound = TLString.deserialized(_data);
            if (!sound) return undefined;
            return new PeerNotifySettings(
                showPreviews,
                silent,
                muteUntil,
                sound)
        }
    
        serialized(): Uint8Array {
            const constructor = PeerNotifySettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.showPreviews) ? (flags | 1) : (flags & ~1);
            flags = (this.silent) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.muteUntil.serialized());
            data.push(this.sound.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly showPreviews: boolean,
            readonly silent: boolean,
            readonly muteUntil: TLInt,
            readonly sound: TLString) {}
    
    } // class PeerNotifySettings
    

    export class PeerSettings implements TLObject {
        static readonly cons = new TLInt(0x818426cd);
    
        static deserialized(_data: ByteStream): PeerSettings | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PeerSettings.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const reportSpam = (flags.value & 1) !== 0;
            return new PeerSettings(
                reportSpam)
        }
    
        serialized(): Uint8Array {
            const constructor = PeerSettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.reportSpam) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly reportSpam: boolean) {}
    
    } // class PeerSettings
    

    export class WallPaper implements TLObject {
        static readonly cons = new TLInt(0xccb03657);
    
        static deserialized(_data: ByteStream): WallPaper | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(WallPaper.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const sizes = TLVector.deserialized(_data, ) as TLVector<PhotoSizeType>;
            if (!sizes) return undefined;
            const color = TLInt.deserialized(_data);
            if (!color) return undefined;
            return new WallPaper(
                id,
                title,
                sizes,
                color)
        }
    
        serialized(): Uint8Array {
            const constructor = WallPaper.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.title.serialized());
            data.push(this.sizes.serialized());
            data.push(this.color.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly title: TLString,
            readonly sizes: TLVector<PhotoSizeType>,
            readonly color: TLInt) {}
    
    } // class WallPaper
    

    export class WallPaperSolid implements TLObject {
        static readonly cons = new TLInt(0x63117f24);
    
        static deserialized(_data: ByteStream): WallPaperSolid | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(WallPaperSolid.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const bgColor = TLInt.deserialized(_data);
            if (!bgColor) return undefined;
            const color = TLInt.deserialized(_data);
            if (!color) return undefined;
            return new WallPaperSolid(
                id,
                title,
                bgColor,
                color)
        }
    
        serialized(): Uint8Array {
            const constructor = WallPaperSolid.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.title.serialized());
            data.push(this.bgColor.serialized());
            data.push(this.color.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly title: TLString,
            readonly bgColor: TLInt,
            readonly color: TLInt) {}
    
    } // class WallPaperSolid
    

    export class InputReportReasonSpam implements TLObject {
        static readonly cons = new TLInt(0x58dbcab8);
    
        static deserialized(_data: ByteStream): InputReportReasonSpam | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputReportReasonSpam.cons)) return undefined;
            return new InputReportReasonSpam()
        }
    
        serialized(): Uint8Array {
            const constructor = InputReportReasonSpam.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputReportReasonSpam
    

    export class InputReportReasonViolence implements TLObject {
        static readonly cons = new TLInt(0x1e22c78d);
    
        static deserialized(_data: ByteStream): InputReportReasonViolence | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputReportReasonViolence.cons)) return undefined;
            return new InputReportReasonViolence()
        }
    
        serialized(): Uint8Array {
            const constructor = InputReportReasonViolence.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputReportReasonViolence
    

    export class InputReportReasonPornography implements TLObject {
        static readonly cons = new TLInt(0x2e59d922);
    
        static deserialized(_data: ByteStream): InputReportReasonPornography | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputReportReasonPornography.cons)) return undefined;
            return new InputReportReasonPornography()
        }
    
        serialized(): Uint8Array {
            const constructor = InputReportReasonPornography.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputReportReasonPornography
    

    export class InputReportReasonOther implements TLObject {
        static readonly cons = new TLInt(0xe1746d0a);
    
        static deserialized(_data: ByteStream): InputReportReasonOther | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputReportReasonOther.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            return new InputReportReasonOther(
                text)
        }
    
        serialized(): Uint8Array {
            const constructor = InputReportReasonOther.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString) {}
    
    } // class InputReportReasonOther
    

    export class UserFull implements TLObject {
        static readonly cons = new TLInt(0x5932fc03);
    
        static deserialized(_data: ByteStream): UserFull | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UserFull.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const blocked = (flags.value & 1) !== 0;
            const user = deserializedObject(_data) as UserType;
            if (!user) return undefined;
            
            let about: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                about = obj
            }
            const link = deserializedObject(_data) as contacts.Link;
            if (!link) return undefined;
            
            let profilePhoto: PhotoType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as PhotoType;
                if (!obj) return undefined;
                profilePhoto = obj
            }
            const notifySettings = deserializedObject(_data) as PeerNotifySettingsType;
            if (!notifySettings) return undefined;
            
            let botInfo: BotInfo | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = deserializedObject(_data) as BotInfo;
                if (!obj) return undefined;
                botInfo = obj
            }
            return new UserFull(
                blocked,
                user,
                about,
                link,
                profilePhoto,
                notifySettings,
                botInfo)
        }
    
        serialized(): Uint8Array {
            const constructor = UserFull.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.blocked) ? (flags | 1) : (flags & ~1);
            flags = (!this.about) ? (flags | 2) : (flags & ~2);
            flags = (!this.profilePhoto) ? (flags | 4) : (flags & ~4);
            flags = (!this.botInfo) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            data.push(this.user.serialized());
            if (this.about) data.push(this.about.serialized());
            data.push(this.link.serialized());
            if (this.profilePhoto) data.push(this.profilePhoto.serialized());
            data.push(this.notifySettings.serialized());
            if (this.botInfo) data.push(this.botInfo.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly blocked: boolean,
            readonly user: UserType,
            readonly about: TLString | undefined,
            readonly link: contacts.Link,
            readonly profilePhoto: PhotoType | undefined,
            readonly notifySettings: PeerNotifySettingsType,
            readonly botInfo: BotInfo | undefined) {}
    
    } // class UserFull
    

    export class Contact implements TLObject {
        static readonly cons = new TLInt(0xf911c994);
    
        static deserialized(_data: ByteStream): Contact | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Contact.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const mutual = deserializedObject(_data) as BoolType;
            if (!mutual) return undefined;
            
            return new Contact(
                userId,
                mutual)
        }
    
        serialized(): Uint8Array {
            const constructor = Contact.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.mutual.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly mutual: BoolType) {}
    
    } // class Contact
    

    export class ImportedContact implements TLObject {
        static readonly cons = new TLInt(0xd0028438);
    
        static deserialized(_data: ByteStream): ImportedContact | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ImportedContact.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const clientId = TLLong.deserialized(_data);
            if (!clientId) return undefined;
            return new ImportedContact(
                userId,
                clientId)
        }
    
        serialized(): Uint8Array {
            const constructor = ImportedContact.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.clientId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly clientId: TLLong) {}
    
    } // class ImportedContact
    

    export class ContactBlocked implements TLObject {
        static readonly cons = new TLInt(0x561bc879);
    
        static deserialized(_data: ByteStream): ContactBlocked | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ContactBlocked.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new ContactBlocked(
                userId,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = ContactBlocked.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly date: TLInt) {}
    
    } // class ContactBlocked
    

    export class ContactStatus implements TLObject {
        static readonly cons = new TLInt(0xd3680c61);
    
        static deserialized(_data: ByteStream): ContactStatus | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ContactStatus.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const status = deserializedObject(_data) as UserStatusType;
            if (!status) return undefined;
            
            return new ContactStatus(
                userId,
                status)
        }
    
        serialized(): Uint8Array {
            const constructor = ContactStatus.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.status.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly status: UserStatusType) {}
    
    } // class ContactStatus
    

    export namespace contacts {
    export class Link implements TLObject {
        static readonly cons = new TLInt(0x3ace484c);
    
        static deserialized(_data: ByteStream): Link | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Link.cons)) return undefined;
            const myLink = deserializedObject(_data) as ContactLinkType;
            if (!myLink) return undefined;
            
            const foreignLink = deserializedObject(_data) as ContactLinkType;
            if (!foreignLink) return undefined;
            
            const user = deserializedObject(_data) as UserType;
            if (!user) return undefined;
            
            return new Link(
                myLink,
                foreignLink,
                user)
        }
    
        serialized(): Uint8Array {
            const constructor = Link.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.myLink.serialized());
            data.push(this.foreignLink.serialized());
            data.push(this.user.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly myLink: ContactLinkType,
            readonly foreignLink: ContactLinkType,
            readonly user: UserType) {}
    
    } // class Link
    } // namespace contacts

    export namespace contacts {
    export class ContactsNotModified implements TLObject {
        static readonly cons = new TLInt(0xb74ba9d2);
    
        static deserialized(_data: ByteStream): ContactsNotModified | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ContactsNotModified.cons)) return undefined;
            return new ContactsNotModified()
        }
    
        serialized(): Uint8Array {
            const constructor = ContactsNotModified.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ContactsNotModified
    } // namespace contacts

    export namespace contacts {
    export class Contacts implements TLObject {
        static readonly cons = new TLInt(0x6f8b8cb2);
    
        static deserialized(_data: ByteStream): Contacts | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Contacts.cons)) return undefined;
            const contacts = TLVector.deserialized(_data, Contact) as TLVector<Contact>;
            if (!contacts) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new Contacts(
                contacts,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = Contacts.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.contacts.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly contacts: TLVector<Contact>,
            readonly users: TLVector<UserType>) {}
    
    } // class Contacts
    } // namespace contacts

    export namespace contacts {
    export class ImportedContacts implements TLObject {
        static readonly cons = new TLInt(0xad524315);
    
        static deserialized(_data: ByteStream): ImportedContacts | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ImportedContacts.cons)) return undefined;
            const imported = TLVector.deserialized(_data, ImportedContact) as TLVector<ImportedContact>;
            if (!imported) return undefined;
            const retryContacts = TLVector.deserialized(_data, TLLong) as TLVector<TLLong>;
            if (!retryContacts) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new ImportedContacts(
                imported,
                retryContacts,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = ImportedContacts.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.imported.serialized());
            data.push(this.retryContacts.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly imported: TLVector<ImportedContact>,
            readonly retryContacts: TLVector<TLLong>,
            readonly users: TLVector<UserType>) {}
    
    } // class ImportedContacts
    } // namespace contacts

    export namespace contacts {
    export class Blocked implements TLObject {
        static readonly cons = new TLInt(0x1c138d15);
    
        static deserialized(_data: ByteStream): Blocked | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Blocked.cons)) return undefined;
            const blocked = TLVector.deserialized(_data, ContactBlocked) as TLVector<ContactBlocked>;
            if (!blocked) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new Blocked(
                blocked,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = Blocked.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.blocked.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly blocked: TLVector<ContactBlocked>,
            readonly users: TLVector<UserType>) {}
    
    } // class Blocked
    } // namespace contacts

    export namespace contacts {
    export class BlockedSlice implements TLObject {
        static readonly cons = new TLInt(0x900802a1);
    
        static deserialized(_data: ByteStream): BlockedSlice | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BlockedSlice.cons)) return undefined;
            const count = TLInt.deserialized(_data);
            if (!count) return undefined;
            const blocked = TLVector.deserialized(_data, ContactBlocked) as TLVector<ContactBlocked>;
            if (!blocked) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new BlockedSlice(
                count,
                blocked,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = BlockedSlice.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.count.serialized());
            data.push(this.blocked.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly count: TLInt,
            readonly blocked: TLVector<ContactBlocked>,
            readonly users: TLVector<UserType>) {}
    
    } // class BlockedSlice
    } // namespace contacts

    export namespace messages {
    export class Dialogs implements TLObject {
        static readonly cons = new TLInt(0x15ba6c40);
    
        static deserialized(_data: ByteStream): Dialogs | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Dialogs.cons)) return undefined;
            const dialogs = TLVector.deserialized(_data, Dialog) as TLVector<Dialog>;
            if (!dialogs) return undefined;
            const messages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!messages) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new Dialogs(
                dialogs,
                messages,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = Dialogs.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.dialogs.serialized());
            data.push(this.messages.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly dialogs: TLVector<Dialog>,
            readonly messages: TLVector<MessageType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class Dialogs
    } // namespace messages

    export namespace messages {
    export class DialogsSlice implements TLObject {
        static readonly cons = new TLInt(0x71e094f3);
    
        static deserialized(_data: ByteStream): DialogsSlice | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DialogsSlice.cons)) return undefined;
            const count = TLInt.deserialized(_data);
            if (!count) return undefined;
            const dialogs = TLVector.deserialized(_data, Dialog) as TLVector<Dialog>;
            if (!dialogs) return undefined;
            const messages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!messages) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new DialogsSlice(
                count,
                dialogs,
                messages,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = DialogsSlice.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.count.serialized());
            data.push(this.dialogs.serialized());
            data.push(this.messages.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly count: TLInt,
            readonly dialogs: TLVector<Dialog>,
            readonly messages: TLVector<MessageType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class DialogsSlice
    } // namespace messages

    export namespace messages {
    export class Messages implements TLObject {
        static readonly cons = new TLInt(0x8c718e87);
    
        static deserialized(_data: ByteStream): Messages | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Messages.cons)) return undefined;
            const messages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!messages) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new Messages(
                messages,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = Messages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.messages.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly messages: TLVector<MessageType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class Messages
    } // namespace messages

    export namespace messages {
    export class MessagesSlice implements TLObject {
        static readonly cons = new TLInt(0xb446ae3);
    
        static deserialized(_data: ByteStream): MessagesSlice | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessagesSlice.cons)) return undefined;
            const count = TLInt.deserialized(_data);
            if (!count) return undefined;
            const messages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!messages) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new MessagesSlice(
                count,
                messages,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = MessagesSlice.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.count.serialized());
            data.push(this.messages.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly count: TLInt,
            readonly messages: TLVector<MessageType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class MessagesSlice
    } // namespace messages

    export namespace messages {
    export class ChannelMessages implements TLObject {
        static readonly cons = new TLInt(0x99262e37);
    
        static deserialized(_data: ByteStream): ChannelMessages | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelMessages.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const count = TLInt.deserialized(_data);
            if (!count) return undefined;
            const messages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!messages) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new ChannelMessages(
                pts,
                count,
                messages,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            data.push(new TLInt(flags).serialized());
            data.push(this.pts.serialized());
            data.push(this.count.serialized());
            data.push(this.messages.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly pts: TLInt,
            readonly count: TLInt,
            readonly messages: TLVector<MessageType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class ChannelMessages
    } // namespace messages

    export namespace messages {
    export class Chats implements TLObject {
        static readonly cons = new TLInt(0x64ff9fd5);
    
        static deserialized(_data: ByteStream): Chats | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Chats.cons)) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            return new Chats(
                chats)
        }
    
        serialized(): Uint8Array {
            const constructor = Chats.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chats.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chats: TLVector<ChatType>) {}
    
    } // class Chats
    } // namespace messages

    export namespace messages {
    export class ChatFull implements TLObject {
        static readonly cons = new TLInt(0xe5d7d19c);
    
        static deserialized(_data: ByteStream): ChatFull | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatFull.cons)) return undefined;
            const fullChat = deserializedObject(_data) as ChatFullType;
            if (!fullChat) return undefined;
            
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new ChatFull(
                fullChat,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatFull.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.fullChat.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly fullChat: ChatFullType,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class ChatFull
    } // namespace messages

    export namespace messages {
    export class AffectedHistory implements TLObject {
        static readonly cons = new TLInt(0xb45c69d1);
    
        static deserialized(_data: ByteStream): AffectedHistory | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(AffectedHistory.cons)) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            return new AffectedHistory(
                pts,
                ptsCount,
                offset)
        }
    
        serialized(): Uint8Array {
            const constructor = AffectedHistory.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
            data.push(this.offset.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly pts: TLInt,
            readonly ptsCount: TLInt,
            readonly offset: TLInt) {}
    
    } // class AffectedHistory
    } // namespace messages

    export class InputMessagesFilterEmpty implements TLObject {
        static readonly cons = new TLInt(0x57e2f66c);
    
        static deserialized(_data: ByteStream): InputMessagesFilterEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterEmpty.cons)) return undefined;
            return new InputMessagesFilterEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterEmpty
    

    export class InputMessagesFilterPhotos implements TLObject {
        static readonly cons = new TLInt(0x9609a51c);
    
        static deserialized(_data: ByteStream): InputMessagesFilterPhotos | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterPhotos.cons)) return undefined;
            return new InputMessagesFilterPhotos()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterPhotos.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterPhotos
    

    export class InputMessagesFilterVideo implements TLObject {
        static readonly cons = new TLInt(0x9fc00e65);
    
        static deserialized(_data: ByteStream): InputMessagesFilterVideo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterVideo.cons)) return undefined;
            return new InputMessagesFilterVideo()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterVideo.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterVideo
    

    export class InputMessagesFilterPhotoVideo implements TLObject {
        static readonly cons = new TLInt(0x56e9f0e4);
    
        static deserialized(_data: ByteStream): InputMessagesFilterPhotoVideo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterPhotoVideo.cons)) return undefined;
            return new InputMessagesFilterPhotoVideo()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterPhotoVideo.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterPhotoVideo
    

    export class InputMessagesFilterPhotoVideoDocuments implements TLObject {
        static readonly cons = new TLInt(0xd95e73bb);
    
        static deserialized(_data: ByteStream): InputMessagesFilterPhotoVideoDocuments | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterPhotoVideoDocuments.cons)) return undefined;
            return new InputMessagesFilterPhotoVideoDocuments()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterPhotoVideoDocuments.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterPhotoVideoDocuments
    

    export class InputMessagesFilterDocument implements TLObject {
        static readonly cons = new TLInt(0x9eddf188);
    
        static deserialized(_data: ByteStream): InputMessagesFilterDocument | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterDocument.cons)) return undefined;
            return new InputMessagesFilterDocument()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterDocument.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterDocument
    

    export class InputMessagesFilterUrl implements TLObject {
        static readonly cons = new TLInt(0x7ef0dd87);
    
        static deserialized(_data: ByteStream): InputMessagesFilterUrl | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterUrl.cons)) return undefined;
            return new InputMessagesFilterUrl()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterUrl.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterUrl
    

    export class InputMessagesFilterGif implements TLObject {
        static readonly cons = new TLInt(0xffc86587);
    
        static deserialized(_data: ByteStream): InputMessagesFilterGif | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterGif.cons)) return undefined;
            return new InputMessagesFilterGif()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterGif.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterGif
    

    export class InputMessagesFilterVoice implements TLObject {
        static readonly cons = new TLInt(0x50f5c392);
    
        static deserialized(_data: ByteStream): InputMessagesFilterVoice | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterVoice.cons)) return undefined;
            return new InputMessagesFilterVoice()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterVoice.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterVoice
    

    export class InputMessagesFilterMusic implements TLObject {
        static readonly cons = new TLInt(0x3751b49e);
    
        static deserialized(_data: ByteStream): InputMessagesFilterMusic | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterMusic.cons)) return undefined;
            return new InputMessagesFilterMusic()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterMusic.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterMusic
    

    export class InputMessagesFilterChatPhotos implements TLObject {
        static readonly cons = new TLInt(0x3a20ecb8);
    
        static deserialized(_data: ByteStream): InputMessagesFilterChatPhotos | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessagesFilterChatPhotos.cons)) return undefined;
            return new InputMessagesFilterChatPhotos()
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessagesFilterChatPhotos.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputMessagesFilterChatPhotos
    

    export class UpdateNewMessage implements TLObject {
        static readonly cons = new TLInt(0x1f2b0afd);
    
        static deserialized(_data: ByteStream): UpdateNewMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateNewMessage.cons)) return undefined;
            const message = deserializedObject(_data) as MessageType;
            if (!message) return undefined;
            
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateNewMessage(
                message,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateNewMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.message.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly message: MessageType,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateNewMessage
    

    export class UpdateMessageID implements TLObject {
        static readonly cons = new TLInt(0x4e90bfd6);
    
        static deserialized(_data: ByteStream): UpdateMessageID | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateMessageID.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const randomId = TLLong.deserialized(_data);
            if (!randomId) return undefined;
            return new UpdateMessageID(
                id,
                randomId)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateMessageID.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.randomId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly randomId: TLLong) {}
    
    } // class UpdateMessageID
    

    export class UpdateDeleteMessages implements TLObject {
        static readonly cons = new TLInt(0xa20db0e5);
    
        static deserialized(_data: ByteStream): UpdateDeleteMessages | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateDeleteMessages.cons)) return undefined;
            const messages = TLVector.deserialized(_data, TLInt) as TLVector<TLInt>;
            if (!messages) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateDeleteMessages(
                messages,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateDeleteMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.messages.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly messages: TLVector<TLInt>,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateDeleteMessages
    

    export class UpdateUserTyping implements TLObject {
        static readonly cons = new TLInt(0x5c486927);
    
        static deserialized(_data: ByteStream): UpdateUserTyping | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateUserTyping.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const action = deserializedObject(_data) as SendMessageActionType;
            if (!action) return undefined;
            
            return new UpdateUserTyping(
                userId,
                action)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateUserTyping.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.action.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly action: SendMessageActionType) {}
    
    } // class UpdateUserTyping
    

    export class UpdateChatUserTyping implements TLObject {
        static readonly cons = new TLInt(0x9a65ea1f);
    
        static deserialized(_data: ByteStream): UpdateChatUserTyping | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChatUserTyping.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const action = deserializedObject(_data) as SendMessageActionType;
            if (!action) return undefined;
            
            return new UpdateChatUserTyping(
                chatId,
                userId,
                action)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChatUserTyping.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.userId.serialized());
            data.push(this.action.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly userId: TLInt,
            readonly action: SendMessageActionType) {}
    
    } // class UpdateChatUserTyping
    

    export class UpdateChatParticipants implements TLObject {
        static readonly cons = new TLInt(0x7761198);
    
        static deserialized(_data: ByteStream): UpdateChatParticipants | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChatParticipants.cons)) return undefined;
            const participants = deserializedObject(_data) as ChatParticipantsType;
            if (!participants) return undefined;
            
            return new UpdateChatParticipants(
                participants)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChatParticipants.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.participants.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly participants: ChatParticipantsType) {}
    
    } // class UpdateChatParticipants
    

    export class UpdateUserStatus implements TLObject {
        static readonly cons = new TLInt(0x1bfbd823);
    
        static deserialized(_data: ByteStream): UpdateUserStatus | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateUserStatus.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const status = deserializedObject(_data) as UserStatusType;
            if (!status) return undefined;
            
            return new UpdateUserStatus(
                userId,
                status)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateUserStatus.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.status.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly status: UserStatusType) {}
    
    } // class UpdateUserStatus
    

    export class UpdateUserName implements TLObject {
        static readonly cons = new TLInt(0xa7332b73);
    
        static deserialized(_data: ByteStream): UpdateUserName | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateUserName.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const firstName = TLString.deserialized(_data);
            if (!firstName) return undefined;
            const lastName = TLString.deserialized(_data);
            if (!lastName) return undefined;
            const username = TLString.deserialized(_data);
            if (!username) return undefined;
            return new UpdateUserName(
                userId,
                firstName,
                lastName,
                username)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateUserName.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.firstName.serialized());
            data.push(this.lastName.serialized());
            data.push(this.username.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly firstName: TLString,
            readonly lastName: TLString,
            readonly username: TLString) {}
    
    } // class UpdateUserName
    

    export class UpdateUserPhoto implements TLObject {
        static readonly cons = new TLInt(0x95313b0c);
    
        static deserialized(_data: ByteStream): UpdateUserPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateUserPhoto.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const photo = deserializedObject(_data) as UserProfilePhotoType;
            if (!photo) return undefined;
            
            const previous = deserializedObject(_data) as BoolType;
            if (!previous) return undefined;
            
            return new UpdateUserPhoto(
                userId,
                date,
                photo,
                previous)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateUserPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.date.serialized());
            data.push(this.photo.serialized());
            data.push(this.previous.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly date: TLInt,
            readonly photo: UserProfilePhotoType,
            readonly previous: BoolType) {}
    
    } // class UpdateUserPhoto
    

    export class UpdateContactRegistered implements TLObject {
        static readonly cons = new TLInt(0x2575bbb9);
    
        static deserialized(_data: ByteStream): UpdateContactRegistered | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateContactRegistered.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new UpdateContactRegistered(
                userId,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateContactRegistered.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly date: TLInt) {}
    
    } // class UpdateContactRegistered
    

    export class UpdateContactLink implements TLObject {
        static readonly cons = new TLInt(0x9d2e67c5);
    
        static deserialized(_data: ByteStream): UpdateContactLink | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateContactLink.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const myLink = deserializedObject(_data) as ContactLinkType;
            if (!myLink) return undefined;
            
            const foreignLink = deserializedObject(_data) as ContactLinkType;
            if (!foreignLink) return undefined;
            
            return new UpdateContactLink(
                userId,
                myLink,
                foreignLink)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateContactLink.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.myLink.serialized());
            data.push(this.foreignLink.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly myLink: ContactLinkType,
            readonly foreignLink: ContactLinkType) {}
    
    } // class UpdateContactLink
    

    export class UpdateNewAuthorization implements TLObject {
        static readonly cons = new TLInt(0x8f06529a);
    
        static deserialized(_data: ByteStream): UpdateNewAuthorization | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateNewAuthorization.cons)) return undefined;
            const authKeyId = TLLong.deserialized(_data);
            if (!authKeyId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const device = TLString.deserialized(_data);
            if (!device) return undefined;
            const location = TLString.deserialized(_data);
            if (!location) return undefined;
            return new UpdateNewAuthorization(
                authKeyId,
                date,
                device,
                location)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateNewAuthorization.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.authKeyId.serialized());
            data.push(this.date.serialized());
            data.push(this.device.serialized());
            data.push(this.location.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly authKeyId: TLLong,
            readonly date: TLInt,
            readonly device: TLString,
            readonly location: TLString) {}
    
    } // class UpdateNewAuthorization
    

    export class UpdateNewEncryptedMessage implements TLObject {
        static readonly cons = new TLInt(0x12bcbd9a);
    
        static deserialized(_data: ByteStream): UpdateNewEncryptedMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateNewEncryptedMessage.cons)) return undefined;
            const message = deserializedObject(_data) as EncryptedMessageType;
            if (!message) return undefined;
            
            const qts = TLInt.deserialized(_data);
            if (!qts) return undefined;
            return new UpdateNewEncryptedMessage(
                message,
                qts)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateNewEncryptedMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.message.serialized());
            data.push(this.qts.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly message: EncryptedMessageType,
            readonly qts: TLInt) {}
    
    } // class UpdateNewEncryptedMessage
    

    export class UpdateEncryptedChatTyping implements TLObject {
        static readonly cons = new TLInt(0x1710f156);
    
        static deserialized(_data: ByteStream): UpdateEncryptedChatTyping | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateEncryptedChatTyping.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            return new UpdateEncryptedChatTyping(
                chatId)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateEncryptedChatTyping.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt) {}
    
    } // class UpdateEncryptedChatTyping
    

    export class UpdateEncryption implements TLObject {
        static readonly cons = new TLInt(0xb4a2e88d);
    
        static deserialized(_data: ByteStream): UpdateEncryption | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateEncryption.cons)) return undefined;
            const chat = deserializedObject(_data) as EncryptedChatType;
            if (!chat) return undefined;
            
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new UpdateEncryption(
                chat,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateEncryption.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chat.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chat: EncryptedChatType,
            readonly date: TLInt) {}
    
    } // class UpdateEncryption
    

    export class UpdateEncryptedMessagesRead implements TLObject {
        static readonly cons = new TLInt(0x38fe25b7);
    
        static deserialized(_data: ByteStream): UpdateEncryptedMessagesRead | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateEncryptedMessagesRead.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const maxDate = TLInt.deserialized(_data);
            if (!maxDate) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new UpdateEncryptedMessagesRead(
                chatId,
                maxDate,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateEncryptedMessagesRead.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.maxDate.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly maxDate: TLInt,
            readonly date: TLInt) {}
    
    } // class UpdateEncryptedMessagesRead
    

    export class UpdateChatParticipantAdd implements TLObject {
        static readonly cons = new TLInt(0xea4b0e5c);
    
        static deserialized(_data: ByteStream): UpdateChatParticipantAdd | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChatParticipantAdd.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const inviterId = TLInt.deserialized(_data);
            if (!inviterId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            return new UpdateChatParticipantAdd(
                chatId,
                userId,
                inviterId,
                date,
                version)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChatParticipantAdd.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.userId.serialized());
            data.push(this.inviterId.serialized());
            data.push(this.date.serialized());
            data.push(this.version.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly userId: TLInt,
            readonly inviterId: TLInt,
            readonly date: TLInt,
            readonly version: TLInt) {}
    
    } // class UpdateChatParticipantAdd
    

    export class UpdateChatParticipantDelete implements TLObject {
        static readonly cons = new TLInt(0x6e5f8c22);
    
        static deserialized(_data: ByteStream): UpdateChatParticipantDelete | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChatParticipantDelete.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            return new UpdateChatParticipantDelete(
                chatId,
                userId,
                version)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChatParticipantDelete.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.userId.serialized());
            data.push(this.version.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly userId: TLInt,
            readonly version: TLInt) {}
    
    } // class UpdateChatParticipantDelete
    

    export class UpdateDcOptions implements TLObject {
        static readonly cons = new TLInt(0x8e5e9873);
    
        static deserialized(_data: ByteStream): UpdateDcOptions | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateDcOptions.cons)) return undefined;
            const dcOptions = TLVector.deserialized(_data, DcOption) as TLVector<DcOption>;
            if (!dcOptions) return undefined;
            return new UpdateDcOptions(
                dcOptions)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateDcOptions.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.dcOptions.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly dcOptions: TLVector<DcOption>) {}
    
    } // class UpdateDcOptions
    

    export class UpdateUserBlocked implements TLObject {
        static readonly cons = new TLInt(0x80ece81a);
    
        static deserialized(_data: ByteStream): UpdateUserBlocked | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateUserBlocked.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const blocked = deserializedObject(_data) as BoolType;
            if (!blocked) return undefined;
            
            return new UpdateUserBlocked(
                userId,
                blocked)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateUserBlocked.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.blocked.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly blocked: BoolType) {}
    
    } // class UpdateUserBlocked
    

    export class UpdateNotifySettings implements TLObject {
        static readonly cons = new TLInt(0xbec268ef);
    
        static deserialized(_data: ByteStream): UpdateNotifySettings | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateNotifySettings.cons)) return undefined;
            const peer = deserializedObject(_data) as NotifyPeerType;
            if (!peer) return undefined;
            
            const notifySettings = deserializedObject(_data) as PeerNotifySettingsType;
            if (!notifySettings) return undefined;
            
            return new UpdateNotifySettings(
                peer,
                notifySettings)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateNotifySettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.notifySettings.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: NotifyPeerType,
            readonly notifySettings: PeerNotifySettingsType) {}
    
    } // class UpdateNotifySettings
    

    export class UpdateServiceNotification implements TLObject {
        static readonly cons = new TLInt(0x382dd3e4);
    
        static deserialized(_data: ByteStream): UpdateServiceNotification | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateServiceNotification.cons)) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            const message = TLString.deserialized(_data);
            if (!message) return undefined;
            const media = deserializedObject(_data) as MessageMediaType;
            if (!media) return undefined;
            
            const popup = deserializedObject(_data) as BoolType;
            if (!popup) return undefined;
            
            return new UpdateServiceNotification(
                type,
                message,
                media,
                popup)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateServiceNotification.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.type.serialized());
            data.push(this.message.serialized());
            data.push(this.media.serialized());
            data.push(this.popup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly type: TLString,
            readonly message: TLString,
            readonly media: MessageMediaType,
            readonly popup: BoolType) {}
    
    } // class UpdateServiceNotification
    

    export class UpdatePrivacy implements TLObject {
        static readonly cons = new TLInt(0xee3b272a);
    
        static deserialized(_data: ByteStream): UpdatePrivacy | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdatePrivacy.cons)) return undefined;
            const key = deserializedObject(_data) as PrivacyKeyType;
            if (!key) return undefined;
            
            const rules = TLVector.deserialized(_data, ) as TLVector<PrivacyRuleType>;
            if (!rules) return undefined;
            return new UpdatePrivacy(
                key,
                rules)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdatePrivacy.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.key.serialized());
            data.push(this.rules.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly key: PrivacyKeyType,
            readonly rules: TLVector<PrivacyRuleType>) {}
    
    } // class UpdatePrivacy
    

    export class UpdateUserPhone implements TLObject {
        static readonly cons = new TLInt(0x12b9417b);
    
        static deserialized(_data: ByteStream): UpdateUserPhone | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateUserPhone.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const phone = TLString.deserialized(_data);
            if (!phone) return undefined;
            return new UpdateUserPhone(
                userId,
                phone)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateUserPhone.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.phone.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly phone: TLString) {}
    
    } // class UpdateUserPhone
    

    export class UpdateReadHistoryInbox implements TLObject {
        static readonly cons = new TLInt(0x9961fd5c);
    
        static deserialized(_data: ByteStream): UpdateReadHistoryInbox | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateReadHistoryInbox.cons)) return undefined;
            const peer = deserializedObject(_data) as PeerType;
            if (!peer) return undefined;
            
            const maxId = TLInt.deserialized(_data);
            if (!maxId) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateReadHistoryInbox(
                peer,
                maxId,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateReadHistoryInbox.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.maxId.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: PeerType,
            readonly maxId: TLInt,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateReadHistoryInbox
    

    export class UpdateReadHistoryOutbox implements TLObject {
        static readonly cons = new TLInt(0x2f2f21bf);
    
        static deserialized(_data: ByteStream): UpdateReadHistoryOutbox | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateReadHistoryOutbox.cons)) return undefined;
            const peer = deserializedObject(_data) as PeerType;
            if (!peer) return undefined;
            
            const maxId = TLInt.deserialized(_data);
            if (!maxId) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateReadHistoryOutbox(
                peer,
                maxId,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateReadHistoryOutbox.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.maxId.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: PeerType,
            readonly maxId: TLInt,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateReadHistoryOutbox
    

    export class UpdateWebPage implements TLObject {
        static readonly cons = new TLInt(0x7f891213);
    
        static deserialized(_data: ByteStream): UpdateWebPage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateWebPage.cons)) return undefined;
            const webpage = deserializedObject(_data) as WebPageType;
            if (!webpage) return undefined;
            
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateWebPage(
                webpage,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateWebPage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.webpage.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly webpage: WebPageType,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateWebPage
    

    export class UpdateReadMessagesContents implements TLObject {
        static readonly cons = new TLInt(0x68c13933);
    
        static deserialized(_data: ByteStream): UpdateReadMessagesContents | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateReadMessagesContents.cons)) return undefined;
            const messages = TLVector.deserialized(_data, TLInt) as TLVector<TLInt>;
            if (!messages) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateReadMessagesContents(
                messages,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateReadMessagesContents.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.messages.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly messages: TLVector<TLInt>,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateReadMessagesContents
    

    export class UpdateChannelTooLong implements TLObject {
        static readonly cons = new TLInt(0xeb0467fb);
    
        static deserialized(_data: ByteStream): UpdateChannelTooLong | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChannelTooLong.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            let pts: TLInt | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                pts = obj
            }
            return new UpdateChannelTooLong(
                channelId,
                pts)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChannelTooLong.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.pts) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.channelId.serialized());
            if (this.pts) data.push(this.pts.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt,
            readonly pts: TLInt | undefined) {}
    
    } // class UpdateChannelTooLong
    

    export class UpdateChannel implements TLObject {
        static readonly cons = new TLInt(0xb6d45656);
    
        static deserialized(_data: ByteStream): UpdateChannel | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChannel.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            return new UpdateChannel(
                channelId)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt) {}
    
    } // class UpdateChannel
    

    export class UpdateNewChannelMessage implements TLObject {
        static readonly cons = new TLInt(0x62ba04d9);
    
        static deserialized(_data: ByteStream): UpdateNewChannelMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateNewChannelMessage.cons)) return undefined;
            const message = deserializedObject(_data) as MessageType;
            if (!message) return undefined;
            
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateNewChannelMessage(
                message,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateNewChannelMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.message.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly message: MessageType,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateNewChannelMessage
    

    export class UpdateReadChannelInbox implements TLObject {
        static readonly cons = new TLInt(0x4214f37f);
    
        static deserialized(_data: ByteStream): UpdateReadChannelInbox | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateReadChannelInbox.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            const maxId = TLInt.deserialized(_data);
            if (!maxId) return undefined;
            return new UpdateReadChannelInbox(
                channelId,
                maxId)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateReadChannelInbox.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
            data.push(this.maxId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt,
            readonly maxId: TLInt) {}
    
    } // class UpdateReadChannelInbox
    

    export class UpdateDeleteChannelMessages implements TLObject {
        static readonly cons = new TLInt(0xc37521c9);
    
        static deserialized(_data: ByteStream): UpdateDeleteChannelMessages | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateDeleteChannelMessages.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            const messages = TLVector.deserialized(_data, TLInt) as TLVector<TLInt>;
            if (!messages) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateDeleteChannelMessages(
                channelId,
                messages,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateDeleteChannelMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
            data.push(this.messages.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt,
            readonly messages: TLVector<TLInt>,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateDeleteChannelMessages
    

    export class UpdateChannelMessageViews implements TLObject {
        static readonly cons = new TLInt(0x98a12b4b);
    
        static deserialized(_data: ByteStream): UpdateChannelMessageViews | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChannelMessageViews.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const views = TLInt.deserialized(_data);
            if (!views) return undefined;
            return new UpdateChannelMessageViews(
                channelId,
                id,
                views)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChannelMessageViews.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
            data.push(this.id.serialized());
            data.push(this.views.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt,
            readonly id: TLInt,
            readonly views: TLInt) {}
    
    } // class UpdateChannelMessageViews
    

    export class UpdateChatAdmins implements TLObject {
        static readonly cons = new TLInt(0x6e947941);
    
        static deserialized(_data: ByteStream): UpdateChatAdmins | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChatAdmins.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const enabled = deserializedObject(_data) as BoolType;
            if (!enabled) return undefined;
            
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            return new UpdateChatAdmins(
                chatId,
                enabled,
                version)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChatAdmins.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.enabled.serialized());
            data.push(this.version.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly enabled: BoolType,
            readonly version: TLInt) {}
    
    } // class UpdateChatAdmins
    

    export class UpdateChatParticipantAdmin implements TLObject {
        static readonly cons = new TLInt(0xb6901959);
    
        static deserialized(_data: ByteStream): UpdateChatParticipantAdmin | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChatParticipantAdmin.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const isAdmin = deserializedObject(_data) as BoolType;
            if (!isAdmin) return undefined;
            
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            return new UpdateChatParticipantAdmin(
                chatId,
                userId,
                isAdmin,
                version)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChatParticipantAdmin.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.userId.serialized());
            data.push(this.isAdmin.serialized());
            data.push(this.version.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly userId: TLInt,
            readonly isAdmin: BoolType,
            readonly version: TLInt) {}
    
    } // class UpdateChatParticipantAdmin
    

    export class UpdateNewStickerSet implements TLObject {
        static readonly cons = new TLInt(0x688a30aa);
    
        static deserialized(_data: ByteStream): UpdateNewStickerSet | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateNewStickerSet.cons)) return undefined;
            const stickerset = deserializedObject(_data) as messages.StickerSet;
            if (!stickerset) return undefined;
            
            return new UpdateNewStickerSet(
                stickerset)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateNewStickerSet.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.stickerset.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly stickerset: messages.StickerSet) {}
    
    } // class UpdateNewStickerSet
    

    export class UpdateStickerSetsOrder implements TLObject {
        static readonly cons = new TLInt(0xbb2d201);
    
        static deserialized(_data: ByteStream): UpdateStickerSetsOrder | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateStickerSetsOrder.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const masks = (flags.value & 1) !== 0;
            const order = TLVector.deserialized(_data, TLLong) as TLVector<TLLong>;
            if (!order) return undefined;
            return new UpdateStickerSetsOrder(
                masks,
                order)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateStickerSetsOrder.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.masks) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.order.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly masks: boolean,
            readonly order: TLVector<TLLong>) {}
    
    } // class UpdateStickerSetsOrder
    

    export class UpdateStickerSets implements TLObject {
        static readonly cons = new TLInt(0x43ae3dec);
    
        static deserialized(_data: ByteStream): UpdateStickerSets | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateStickerSets.cons)) return undefined;
            return new UpdateStickerSets()
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateStickerSets.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UpdateStickerSets
    

    export class UpdateSavedGifs implements TLObject {
        static readonly cons = new TLInt(0x9375341e);
    
        static deserialized(_data: ByteStream): UpdateSavedGifs | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateSavedGifs.cons)) return undefined;
            return new UpdateSavedGifs()
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateSavedGifs.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UpdateSavedGifs
    

    export class UpdateBotInlineQuery implements TLObject {
        static readonly cons = new TLInt(0x54826690);
    
        static deserialized(_data: ByteStream): UpdateBotInlineQuery | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateBotInlineQuery.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const queryId = TLLong.deserialized(_data);
            if (!queryId) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const query = TLString.deserialized(_data);
            if (!query) return undefined;
            let geo: GeoPointType | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = deserializedObject(_data) as GeoPointType;
                if (!obj) return undefined;
                geo = obj
            }
            const offset = TLString.deserialized(_data);
            if (!offset) return undefined;
            return new UpdateBotInlineQuery(
                queryId,
                userId,
                query,
                geo,
                offset)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateBotInlineQuery.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.geo) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.queryId.serialized());
            data.push(this.userId.serialized());
            data.push(this.query.serialized());
            if (this.geo) data.push(this.geo.serialized());
            data.push(this.offset.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly queryId: TLLong,
            readonly userId: TLInt,
            readonly query: TLString,
            readonly geo: GeoPointType | undefined,
            readonly offset: TLString) {}
    
    } // class UpdateBotInlineQuery
    

    export class UpdateBotInlineSend implements TLObject {
        static readonly cons = new TLInt(0xe48f964);
    
        static deserialized(_data: ByteStream): UpdateBotInlineSend | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateBotInlineSend.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const query = TLString.deserialized(_data);
            if (!query) return undefined;
            let geo: GeoPointType | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = deserializedObject(_data) as GeoPointType;
                if (!obj) return undefined;
                geo = obj
            }
            const id = TLString.deserialized(_data);
            if (!id) return undefined;
            let msgId: InputBotInlineMessageID | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = deserializedObject(_data) as InputBotInlineMessageID;
                if (!obj) return undefined;
                msgId = obj
            }
            return new UpdateBotInlineSend(
                userId,
                query,
                geo,
                id,
                msgId)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateBotInlineSend.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.geo) ? (flags | 1) : (flags & ~1);
            flags = (!this.msgId) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.userId.serialized());
            data.push(this.query.serialized());
            if (this.geo) data.push(this.geo.serialized());
            data.push(this.id.serialized());
            if (this.msgId) data.push(this.msgId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly query: TLString,
            readonly geo: GeoPointType | undefined,
            readonly id: TLString,
            readonly msgId: InputBotInlineMessageID | undefined) {}
    
    } // class UpdateBotInlineSend
    

    export class UpdateEditChannelMessage implements TLObject {
        static readonly cons = new TLInt(0x1b3f4df7);
    
        static deserialized(_data: ByteStream): UpdateEditChannelMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateEditChannelMessage.cons)) return undefined;
            const message = deserializedObject(_data) as MessageType;
            if (!message) return undefined;
            
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateEditChannelMessage(
                message,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateEditChannelMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.message.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly message: MessageType,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateEditChannelMessage
    

    export class UpdateChannelPinnedMessage implements TLObject {
        static readonly cons = new TLInt(0x98592475);
    
        static deserialized(_data: ByteStream): UpdateChannelPinnedMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateChannelPinnedMessage.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            return new UpdateChannelPinnedMessage(
                channelId,
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateChannelPinnedMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt,
            readonly id: TLInt) {}
    
    } // class UpdateChannelPinnedMessage
    

    export class UpdateBotCallbackQuery implements TLObject {
        static readonly cons = new TLInt(0xe73547e1);
    
        static deserialized(_data: ByteStream): UpdateBotCallbackQuery | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateBotCallbackQuery.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const queryId = TLLong.deserialized(_data);
            if (!queryId) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const peer = deserializedObject(_data) as PeerType;
            if (!peer) return undefined;
            
            const msgId = TLInt.deserialized(_data);
            if (!msgId) return undefined;
            const chatInstance = TLLong.deserialized(_data);
            if (!chatInstance) return undefined;
            let data: TLBytes | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLBytes.deserialized(_data);
                if (!obj) return undefined;
                data = obj
            }
            let gameShortName: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                gameShortName = obj
            }
            return new UpdateBotCallbackQuery(
                queryId,
                userId,
                peer,
                msgId,
                chatInstance,
                data,
                gameShortName)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateBotCallbackQuery.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.data) ? (flags | 1) : (flags & ~1);
            flags = (!this.gameShortName) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.queryId.serialized());
            data.push(this.userId.serialized());
            data.push(this.peer.serialized());
            data.push(this.msgId.serialized());
            data.push(this.chatInstance.serialized());
            if (this.data) data.push(this.data.serialized());
            if (this.gameShortName) data.push(this.gameShortName.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly queryId: TLLong,
            readonly userId: TLInt,
            readonly peer: PeerType,
            readonly msgId: TLInt,
            readonly chatInstance: TLLong,
            readonly data: TLBytes | undefined,
            readonly gameShortName: TLString | undefined) {}
    
    } // class UpdateBotCallbackQuery
    

    export class UpdateEditMessage implements TLObject {
        static readonly cons = new TLInt(0xe40370a3);
    
        static deserialized(_data: ByteStream): UpdateEditMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateEditMessage.cons)) return undefined;
            const message = deserializedObject(_data) as MessageType;
            if (!message) return undefined;
            
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new UpdateEditMessage(
                message,
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateEditMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.message.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly message: MessageType,
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class UpdateEditMessage
    

    export class UpdateInlineBotCallbackQuery implements TLObject {
        static readonly cons = new TLInt(0xf9d27a5a);
    
        static deserialized(_data: ByteStream): UpdateInlineBotCallbackQuery | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateInlineBotCallbackQuery.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const queryId = TLLong.deserialized(_data);
            if (!queryId) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const msgId = deserializedObject(_data) as InputBotInlineMessageID;
            if (!msgId) return undefined;
            
            const chatInstance = TLLong.deserialized(_data);
            if (!chatInstance) return undefined;
            let data: TLBytes | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLBytes.deserialized(_data);
                if (!obj) return undefined;
                data = obj
            }
            let gameShortName: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                gameShortName = obj
            }
            return new UpdateInlineBotCallbackQuery(
                queryId,
                userId,
                msgId,
                chatInstance,
                data,
                gameShortName)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateInlineBotCallbackQuery.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.data) ? (flags | 1) : (flags & ~1);
            flags = (!this.gameShortName) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.queryId.serialized());
            data.push(this.userId.serialized());
            data.push(this.msgId.serialized());
            data.push(this.chatInstance.serialized());
            if (this.data) data.push(this.data.serialized());
            if (this.gameShortName) data.push(this.gameShortName.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly queryId: TLLong,
            readonly userId: TLInt,
            readonly msgId: InputBotInlineMessageID,
            readonly chatInstance: TLLong,
            readonly data: TLBytes | undefined,
            readonly gameShortName: TLString | undefined) {}
    
    } // class UpdateInlineBotCallbackQuery
    

    export class UpdateReadChannelOutbox implements TLObject {
        static readonly cons = new TLInt(0x25d6c9c7);
    
        static deserialized(_data: ByteStream): UpdateReadChannelOutbox | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateReadChannelOutbox.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            const maxId = TLInt.deserialized(_data);
            if (!maxId) return undefined;
            return new UpdateReadChannelOutbox(
                channelId,
                maxId)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateReadChannelOutbox.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
            data.push(this.maxId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt,
            readonly maxId: TLInt) {}
    
    } // class UpdateReadChannelOutbox
    

    export class UpdateDraftMessage implements TLObject {
        static readonly cons = new TLInt(0xee2bb969);
    
        static deserialized(_data: ByteStream): UpdateDraftMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateDraftMessage.cons)) return undefined;
            const peer = deserializedObject(_data) as PeerType;
            if (!peer) return undefined;
            
            const draft = deserializedObject(_data) as DraftMessageType;
            if (!draft) return undefined;
            
            return new UpdateDraftMessage(
                peer,
                draft)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateDraftMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.draft.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: PeerType,
            readonly draft: DraftMessageType) {}
    
    } // class UpdateDraftMessage
    

    export class UpdateReadFeaturedStickers implements TLObject {
        static readonly cons = new TLInt(0x571d2742);
    
        static deserialized(_data: ByteStream): UpdateReadFeaturedStickers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateReadFeaturedStickers.cons)) return undefined;
            return new UpdateReadFeaturedStickers()
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateReadFeaturedStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UpdateReadFeaturedStickers
    

    export class UpdateRecentStickers implements TLObject {
        static readonly cons = new TLInt(0x9a422c20);
    
        static deserialized(_data: ByteStream): UpdateRecentStickers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateRecentStickers.cons)) return undefined;
            return new UpdateRecentStickers()
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateRecentStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UpdateRecentStickers
    

    export class UpdateConfig implements TLObject {
        static readonly cons = new TLInt(0xa229dd06);
    
        static deserialized(_data: ByteStream): UpdateConfig | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateConfig.cons)) return undefined;
            return new UpdateConfig()
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateConfig.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UpdateConfig
    

    export class UpdatePtsChanged implements TLObject {
        static readonly cons = new TLInt(0x3354678f);
    
        static deserialized(_data: ByteStream): UpdatePtsChanged | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdatePtsChanged.cons)) return undefined;
            return new UpdatePtsChanged()
        }
    
        serialized(): Uint8Array {
            const constructor = UpdatePtsChanged.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UpdatePtsChanged
    

    export namespace updates {
    export class State implements TLObject {
        static readonly cons = new TLInt(0xa56c2a3e);
    
        static deserialized(_data: ByteStream): State | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(State.cons)) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const qts = TLInt.deserialized(_data);
            if (!qts) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const seq = TLInt.deserialized(_data);
            if (!seq) return undefined;
            const unreadCount = TLInt.deserialized(_data);
            if (!unreadCount) return undefined;
            return new State(
                pts,
                qts,
                date,
                seq,
                unreadCount)
        }
    
        serialized(): Uint8Array {
            const constructor = State.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.pts.serialized());
            data.push(this.qts.serialized());
            data.push(this.date.serialized());
            data.push(this.seq.serialized());
            data.push(this.unreadCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly pts: TLInt,
            readonly qts: TLInt,
            readonly date: TLInt,
            readonly seq: TLInt,
            readonly unreadCount: TLInt) {}
    
    } // class State
    } // namespace updates

    export namespace updates {
    export class DifferenceEmpty implements TLObject {
        static readonly cons = new TLInt(0x5d75a138);
    
        static deserialized(_data: ByteStream): DifferenceEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DifferenceEmpty.cons)) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const seq = TLInt.deserialized(_data);
            if (!seq) return undefined;
            return new DifferenceEmpty(
                date,
                seq)
        }
    
        serialized(): Uint8Array {
            const constructor = DifferenceEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.date.serialized());
            data.push(this.seq.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly date: TLInt,
            readonly seq: TLInt) {}
    
    } // class DifferenceEmpty
    } // namespace updates

    export namespace updates {
    export class Difference implements TLObject {
        static readonly cons = new TLInt(0xf49ca0);
    
        static deserialized(_data: ByteStream): Difference | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Difference.cons)) return undefined;
            const newMessages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!newMessages) return undefined;
            const newEncryptedMessages = TLVector.deserialized(_data, ) as TLVector<EncryptedMessageType>;
            if (!newEncryptedMessages) return undefined;
            const otherUpdates = TLVector.deserialized(_data, ) as TLVector<UpdateType>;
            if (!otherUpdates) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            const state = deserializedObject(_data) as updates.State;
            if (!state) return undefined;
            
            return new Difference(
                newMessages,
                newEncryptedMessages,
                otherUpdates,
                chats,
                users,
                state)
        }
    
        serialized(): Uint8Array {
            const constructor = Difference.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.newMessages.serialized());
            data.push(this.newEncryptedMessages.serialized());
            data.push(this.otherUpdates.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
            data.push(this.state.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly newMessages: TLVector<MessageType>,
            readonly newEncryptedMessages: TLVector<EncryptedMessageType>,
            readonly otherUpdates: TLVector<UpdateType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>,
            readonly state: updates.State) {}
    
    } // class Difference
    } // namespace updates

    export namespace updates {
    export class DifferenceSlice implements TLObject {
        static readonly cons = new TLInt(0xa8fb1981);
    
        static deserialized(_data: ByteStream): DifferenceSlice | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DifferenceSlice.cons)) return undefined;
            const newMessages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!newMessages) return undefined;
            const newEncryptedMessages = TLVector.deserialized(_data, ) as TLVector<EncryptedMessageType>;
            if (!newEncryptedMessages) return undefined;
            const otherUpdates = TLVector.deserialized(_data, ) as TLVector<UpdateType>;
            if (!otherUpdates) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            const intermediateState = deserializedObject(_data) as updates.State;
            if (!intermediateState) return undefined;
            
            return new DifferenceSlice(
                newMessages,
                newEncryptedMessages,
                otherUpdates,
                chats,
                users,
                intermediateState)
        }
    
        serialized(): Uint8Array {
            const constructor = DifferenceSlice.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.newMessages.serialized());
            data.push(this.newEncryptedMessages.serialized());
            data.push(this.otherUpdates.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
            data.push(this.intermediateState.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly newMessages: TLVector<MessageType>,
            readonly newEncryptedMessages: TLVector<EncryptedMessageType>,
            readonly otherUpdates: TLVector<UpdateType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>,
            readonly intermediateState: updates.State) {}
    
    } // class DifferenceSlice
    } // namespace updates

    export class UpdatesTooLong implements TLObject {
        static readonly cons = new TLInt(0xe317af7e);
    
        static deserialized(_data: ByteStream): UpdatesTooLong | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdatesTooLong.cons)) return undefined;
            return new UpdatesTooLong()
        }
    
        serialized(): Uint8Array {
            const constructor = UpdatesTooLong.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class UpdatesTooLong
    

    export class UpdateShortMessage implements TLObject {
        static readonly cons = new TLInt(0x914fbf11);
    
        static deserialized(_data: ByteStream): UpdateShortMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateShortMessage.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const out = (flags.value & 2) !== 0;
            const mentioned = (flags.value & 16) !== 0;
            const mediaUnread = (flags.value & 32) !== 0;
            const silent = (flags.value & 8192) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const message = TLString.deserialized(_data);
            if (!message) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            let fwdFrom: MessageFwdHeader | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as MessageFwdHeader;
                if (!obj) return undefined;
                fwdFrom = obj
            }
            let viaBotId: TLInt | undefined;
            if ((flags.value & 2048) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                viaBotId = obj
            }
            let replyToMsgId: TLInt | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                replyToMsgId = obj
            }
            let entities: TLVector<MessageEntityType> | undefined;
            if ((flags.value & 128) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<MessageEntityType>;
                if (!obj) return undefined;
                entities = obj
            }
            return new UpdateShortMessage(
                out,
                mentioned,
                mediaUnread,
                silent,
                id,
                userId,
                message,
                pts,
                ptsCount,
                date,
                fwdFrom,
                viaBotId,
                replyToMsgId,
                entities)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateShortMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.out) ? (flags | 2) : (flags & ~2);
            flags = (this.mentioned) ? (flags | 16) : (flags & ~16);
            flags = (this.mediaUnread) ? (flags | 32) : (flags & ~32);
            flags = (this.silent) ? (flags | 8192) : (flags & ~8192);
            flags = (!this.fwdFrom) ? (flags | 4) : (flags & ~4);
            flags = (!this.viaBotId) ? (flags | 2048) : (flags & ~2048);
            flags = (!this.replyToMsgId) ? (flags | 8) : (flags & ~8);
            flags = (!this.entities) ? (flags | 128) : (flags & ~128);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.userId.serialized());
            data.push(this.message.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
            data.push(this.date.serialized());
            if (this.fwdFrom) data.push(this.fwdFrom.serialized());
            if (this.viaBotId) data.push(this.viaBotId.serialized());
            if (this.replyToMsgId) data.push(this.replyToMsgId.serialized());
            if (this.entities) data.push(this.entities.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly out: boolean,
            readonly mentioned: boolean,
            readonly mediaUnread: boolean,
            readonly silent: boolean,
            readonly id: TLInt,
            readonly userId: TLInt,
            readonly message: TLString,
            readonly pts: TLInt,
            readonly ptsCount: TLInt,
            readonly date: TLInt,
            readonly fwdFrom: MessageFwdHeader | undefined,
            readonly viaBotId: TLInt | undefined,
            readonly replyToMsgId: TLInt | undefined,
            readonly entities: TLVector<MessageEntityType> | undefined) {}
    
    } // class UpdateShortMessage
    

    export class UpdateShortChatMessage implements TLObject {
        static readonly cons = new TLInt(0x16812688);
    
        static deserialized(_data: ByteStream): UpdateShortChatMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateShortChatMessage.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const out = (flags.value & 2) !== 0;
            const mentioned = (flags.value & 16) !== 0;
            const mediaUnread = (flags.value & 32) !== 0;
            const silent = (flags.value & 8192) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const fromId = TLInt.deserialized(_data);
            if (!fromId) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const message = TLString.deserialized(_data);
            if (!message) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            let fwdFrom: MessageFwdHeader | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as MessageFwdHeader;
                if (!obj) return undefined;
                fwdFrom = obj
            }
            let viaBotId: TLInt | undefined;
            if ((flags.value & 2048) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                viaBotId = obj
            }
            let replyToMsgId: TLInt | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                replyToMsgId = obj
            }
            let entities: TLVector<MessageEntityType> | undefined;
            if ((flags.value & 128) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<MessageEntityType>;
                if (!obj) return undefined;
                entities = obj
            }
            return new UpdateShortChatMessage(
                out,
                mentioned,
                mediaUnread,
                silent,
                id,
                fromId,
                chatId,
                message,
                pts,
                ptsCount,
                date,
                fwdFrom,
                viaBotId,
                replyToMsgId,
                entities)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateShortChatMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.out) ? (flags | 2) : (flags & ~2);
            flags = (this.mentioned) ? (flags | 16) : (flags & ~16);
            flags = (this.mediaUnread) ? (flags | 32) : (flags & ~32);
            flags = (this.silent) ? (flags | 8192) : (flags & ~8192);
            flags = (!this.fwdFrom) ? (flags | 4) : (flags & ~4);
            flags = (!this.viaBotId) ? (flags | 2048) : (flags & ~2048);
            flags = (!this.replyToMsgId) ? (flags | 8) : (flags & ~8);
            flags = (!this.entities) ? (flags | 128) : (flags & ~128);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.fromId.serialized());
            data.push(this.chatId.serialized());
            data.push(this.message.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
            data.push(this.date.serialized());
            if (this.fwdFrom) data.push(this.fwdFrom.serialized());
            if (this.viaBotId) data.push(this.viaBotId.serialized());
            if (this.replyToMsgId) data.push(this.replyToMsgId.serialized());
            if (this.entities) data.push(this.entities.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly out: boolean,
            readonly mentioned: boolean,
            readonly mediaUnread: boolean,
            readonly silent: boolean,
            readonly id: TLInt,
            readonly fromId: TLInt,
            readonly chatId: TLInt,
            readonly message: TLString,
            readonly pts: TLInt,
            readonly ptsCount: TLInt,
            readonly date: TLInt,
            readonly fwdFrom: MessageFwdHeader | undefined,
            readonly viaBotId: TLInt | undefined,
            readonly replyToMsgId: TLInt | undefined,
            readonly entities: TLVector<MessageEntityType> | undefined) {}
    
    } // class UpdateShortChatMessage
    

    export class UpdateShort implements TLObject {
        static readonly cons = new TLInt(0x78d4dec1);
    
        static deserialized(_data: ByteStream): UpdateShort | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateShort.cons)) return undefined;
            const update = deserializedObject(_data) as UpdateType;
            if (!update) return undefined;
            
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new UpdateShort(
                update,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateShort.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.update.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly update: UpdateType,
            readonly date: TLInt) {}
    
    } // class UpdateShort
    

    export class UpdatesCombined implements TLObject {
        static readonly cons = new TLInt(0x725b04c3);
    
        static deserialized(_data: ByteStream): UpdatesCombined | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdatesCombined.cons)) return undefined;
            const updates = TLVector.deserialized(_data, ) as TLVector<UpdateType>;
            if (!updates) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const seqStart = TLInt.deserialized(_data);
            if (!seqStart) return undefined;
            const seq = TLInt.deserialized(_data);
            if (!seq) return undefined;
            return new UpdatesCombined(
                updates,
                users,
                chats,
                date,
                seqStart,
                seq)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdatesCombined.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.updates.serialized());
            data.push(this.users.serialized());
            data.push(this.chats.serialized());
            data.push(this.date.serialized());
            data.push(this.seqStart.serialized());
            data.push(this.seq.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly updates: TLVector<UpdateType>,
            readonly users: TLVector<UserType>,
            readonly chats: TLVector<ChatType>,
            readonly date: TLInt,
            readonly seqStart: TLInt,
            readonly seq: TLInt) {}
    
    } // class UpdatesCombined
    

    export class Updates implements TLObject {
        static readonly cons = new TLInt(0x74ae4240);
    
        static deserialized(_data: ByteStream): Updates | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Updates.cons)) return undefined;
            const updates = TLVector.deserialized(_data, ) as TLVector<UpdateType>;
            if (!updates) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const seq = TLInt.deserialized(_data);
            if (!seq) return undefined;
            return new Updates(
                updates,
                users,
                chats,
                date,
                seq)
        }
    
        serialized(): Uint8Array {
            const constructor = Updates.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.updates.serialized());
            data.push(this.users.serialized());
            data.push(this.chats.serialized());
            data.push(this.date.serialized());
            data.push(this.seq.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly updates: TLVector<UpdateType>,
            readonly users: TLVector<UserType>,
            readonly chats: TLVector<ChatType>,
            readonly date: TLInt,
            readonly seq: TLInt) {}
    
    } // class Updates
    

    export class UpdateShortSentMessage implements TLObject {
        static readonly cons = new TLInt(0x11f1331c);
    
        static deserialized(_data: ByteStream): UpdateShortSentMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(UpdateShortSentMessage.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const out = (flags.value & 2) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            let media: MessageMediaType | undefined;
            if ((flags.value & 512) !== 0) {
                const obj = deserializedObject(_data) as MessageMediaType;
                if (!obj) return undefined;
                media = obj
            }
            let entities: TLVector<MessageEntityType> | undefined;
            if ((flags.value & 128) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<MessageEntityType>;
                if (!obj) return undefined;
                entities = obj
            }
            return new UpdateShortSentMessage(
                out,
                id,
                pts,
                ptsCount,
                date,
                media,
                entities)
        }
    
        serialized(): Uint8Array {
            const constructor = UpdateShortSentMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.out) ? (flags | 2) : (flags & ~2);
            flags = (!this.media) ? (flags | 512) : (flags & ~512);
            flags = (!this.entities) ? (flags | 128) : (flags & ~128);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
            data.push(this.date.serialized());
            if (this.media) data.push(this.media.serialized());
            if (this.entities) data.push(this.entities.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly out: boolean,
            readonly id: TLInt,
            readonly pts: TLInt,
            readonly ptsCount: TLInt,
            readonly date: TLInt,
            readonly media: MessageMediaType | undefined,
            readonly entities: TLVector<MessageEntityType> | undefined) {}
    
    } // class UpdateShortSentMessage
    

    export namespace photos {
    export class Photos implements TLObject {
        static readonly cons = new TLInt(0x8dca6aa5);
    
        static deserialized(_data: ByteStream): Photos | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Photos.cons)) return undefined;
            const photos = TLVector.deserialized(_data, ) as TLVector<PhotoType>;
            if (!photos) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new Photos(
                photos,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = Photos.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.photos.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly photos: TLVector<PhotoType>,
            readonly users: TLVector<UserType>) {}
    
    } // class Photos
    } // namespace photos

    export namespace photos {
    export class PhotosSlice implements TLObject {
        static readonly cons = new TLInt(0x15051f54);
    
        static deserialized(_data: ByteStream): PhotosSlice | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PhotosSlice.cons)) return undefined;
            const count = TLInt.deserialized(_data);
            if (!count) return undefined;
            const photos = TLVector.deserialized(_data, ) as TLVector<PhotoType>;
            if (!photos) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new PhotosSlice(
                count,
                photos,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = PhotosSlice.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.count.serialized());
            data.push(this.photos.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly count: TLInt,
            readonly photos: TLVector<PhotoType>,
            readonly users: TLVector<UserType>) {}
    
    } // class PhotosSlice
    } // namespace photos

    export namespace photos {
    export class Photo implements TLObject {
        static readonly cons = new TLInt(0x20212ca8);
    
        static deserialized(_data: ByteStream): Photo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Photo.cons)) return undefined;
            const photo = deserializedObject(_data) as PhotoType;
            if (!photo) return undefined;
            
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new Photo(
                photo,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = Photo.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.photo.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly photo: PhotoType,
            readonly users: TLVector<UserType>) {}
    
    } // class Photo
    } // namespace photos

    export namespace upload {
    export class File implements TLObject {
        static readonly cons = new TLInt(0x96a18d5);
    
        static deserialized(_data: ByteStream): File | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(File.cons)) return undefined;
            const type = deserializedObject(_data) as storage.FileTypeType;
            if (!type) return undefined;
            
            const mtime = TLInt.deserialized(_data);
            if (!mtime) return undefined;
            const bytes = TLBytes.deserialized(_data);
            if (!bytes) return undefined;
            return new File(
                type,
                mtime,
                bytes)
        }
    
        serialized(): Uint8Array {
            const constructor = File.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.type.serialized());
            data.push(this.mtime.serialized());
            data.push(this.bytes.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly type: storage.FileTypeType,
            readonly mtime: TLInt,
            readonly bytes: TLBytes) {}
    
    } // class File
    } // namespace upload

    export class DcOption implements TLObject {
        static readonly cons = new TLInt(0x5d8c6cc);
    
        static deserialized(_data: ByteStream): DcOption | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DcOption.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const ipv6 = (flags.value & 1) !== 0;
            const mediaOnly = (flags.value & 2) !== 0;
            const tcpoOnly = (flags.value & 4) !== 0;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const ipAddress = TLString.deserialized(_data);
            if (!ipAddress) return undefined;
            const port = TLInt.deserialized(_data);
            if (!port) return undefined;
            return new DcOption(
                ipv6,
                mediaOnly,
                tcpoOnly,
                id,
                ipAddress,
                port)
        }
    
        serialized(): Uint8Array {
            const constructor = DcOption.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.ipv6) ? (flags | 1) : (flags & ~1);
            flags = (this.mediaOnly) ? (flags | 2) : (flags & ~2);
            flags = (this.tcpoOnly) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.ipAddress.serialized());
            data.push(this.port.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly ipv6: boolean,
            readonly mediaOnly: boolean,
            readonly tcpoOnly: boolean,
            readonly id: TLInt,
            readonly ipAddress: TLString,
            readonly port: TLInt) {}
    
    } // class DcOption
    

    export class Config implements TLObject {
        static readonly cons = new TLInt(0x9a6b2e2a);
    
        static deserialized(_data: ByteStream): Config | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Config.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const expires = TLInt.deserialized(_data);
            if (!expires) return undefined;
            const testMode = deserializedObject(_data) as BoolType;
            if (!testMode) return undefined;
            
            const thisDc = TLInt.deserialized(_data);
            if (!thisDc) return undefined;
            const dcOptions = TLVector.deserialized(_data, DcOption) as TLVector<DcOption>;
            if (!dcOptions) return undefined;
            const chatSizeMax = TLInt.deserialized(_data);
            if (!chatSizeMax) return undefined;
            const megagroupSizeMax = TLInt.deserialized(_data);
            if (!megagroupSizeMax) return undefined;
            const forwardedCountMax = TLInt.deserialized(_data);
            if (!forwardedCountMax) return undefined;
            const onlineUpdatePeriodMs = TLInt.deserialized(_data);
            if (!onlineUpdatePeriodMs) return undefined;
            const offlineBlurTimeoutMs = TLInt.deserialized(_data);
            if (!offlineBlurTimeoutMs) return undefined;
            const offlineIdleTimeoutMs = TLInt.deserialized(_data);
            if (!offlineIdleTimeoutMs) return undefined;
            const onlineCloudTimeoutMs = TLInt.deserialized(_data);
            if (!onlineCloudTimeoutMs) return undefined;
            const notifyCloudDelayMs = TLInt.deserialized(_data);
            if (!notifyCloudDelayMs) return undefined;
            const notifyDefaultDelayMs = TLInt.deserialized(_data);
            if (!notifyDefaultDelayMs) return undefined;
            const chatBigSize = TLInt.deserialized(_data);
            if (!chatBigSize) return undefined;
            const pushChatPeriodMs = TLInt.deserialized(_data);
            if (!pushChatPeriodMs) return undefined;
            const pushChatLimit = TLInt.deserialized(_data);
            if (!pushChatLimit) return undefined;
            const savedGifsLimit = TLInt.deserialized(_data);
            if (!savedGifsLimit) return undefined;
            const editTimeLimit = TLInt.deserialized(_data);
            if (!editTimeLimit) return undefined;
            const ratingEDecay = TLInt.deserialized(_data);
            if (!ratingEDecay) return undefined;
            const stickersRecentLimit = TLInt.deserialized(_data);
            if (!stickersRecentLimit) return undefined;
            let tmpSessions: TLInt | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                tmpSessions = obj
            }
            const disabledFeatures = TLVector.deserialized(_data, DisabledFeature) as TLVector<DisabledFeature>;
            if (!disabledFeatures) return undefined;
            return new Config(
                date,
                expires,
                testMode,
                thisDc,
                dcOptions,
                chatSizeMax,
                megagroupSizeMax,
                forwardedCountMax,
                onlineUpdatePeriodMs,
                offlineBlurTimeoutMs,
                offlineIdleTimeoutMs,
                onlineCloudTimeoutMs,
                notifyCloudDelayMs,
                notifyDefaultDelayMs,
                chatBigSize,
                pushChatPeriodMs,
                pushChatLimit,
                savedGifsLimit,
                editTimeLimit,
                ratingEDecay,
                stickersRecentLimit,
                tmpSessions,
                disabledFeatures)
        }
    
        serialized(): Uint8Array {
            const constructor = Config.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.tmpSessions) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.date.serialized());
            data.push(this.expires.serialized());
            data.push(this.testMode.serialized());
            data.push(this.thisDc.serialized());
            data.push(this.dcOptions.serialized());
            data.push(this.chatSizeMax.serialized());
            data.push(this.megagroupSizeMax.serialized());
            data.push(this.forwardedCountMax.serialized());
            data.push(this.onlineUpdatePeriodMs.serialized());
            data.push(this.offlineBlurTimeoutMs.serialized());
            data.push(this.offlineIdleTimeoutMs.serialized());
            data.push(this.onlineCloudTimeoutMs.serialized());
            data.push(this.notifyCloudDelayMs.serialized());
            data.push(this.notifyDefaultDelayMs.serialized());
            data.push(this.chatBigSize.serialized());
            data.push(this.pushChatPeriodMs.serialized());
            data.push(this.pushChatLimit.serialized());
            data.push(this.savedGifsLimit.serialized());
            data.push(this.editTimeLimit.serialized());
            data.push(this.ratingEDecay.serialized());
            data.push(this.stickersRecentLimit.serialized());
            if (this.tmpSessions) data.push(this.tmpSessions.serialized());
            data.push(this.disabledFeatures.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly date: TLInt,
            readonly expires: TLInt,
            readonly testMode: BoolType,
            readonly thisDc: TLInt,
            readonly dcOptions: TLVector<DcOption>,
            readonly chatSizeMax: TLInt,
            readonly megagroupSizeMax: TLInt,
            readonly forwardedCountMax: TLInt,
            readonly onlineUpdatePeriodMs: TLInt,
            readonly offlineBlurTimeoutMs: TLInt,
            readonly offlineIdleTimeoutMs: TLInt,
            readonly onlineCloudTimeoutMs: TLInt,
            readonly notifyCloudDelayMs: TLInt,
            readonly notifyDefaultDelayMs: TLInt,
            readonly chatBigSize: TLInt,
            readonly pushChatPeriodMs: TLInt,
            readonly pushChatLimit: TLInt,
            readonly savedGifsLimit: TLInt,
            readonly editTimeLimit: TLInt,
            readonly ratingEDecay: TLInt,
            readonly stickersRecentLimit: TLInt,
            readonly tmpSessions: TLInt | undefined,
            readonly disabledFeatures: TLVector<DisabledFeature>) {}
    
    } // class Config
    

    export class NearestDc implements TLObject {
        static readonly cons = new TLInt(0x8e1a1775);
    
        static deserialized(_data: ByteStream): NearestDc | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(NearestDc.cons)) return undefined;
            const country = TLString.deserialized(_data);
            if (!country) return undefined;
            const thisDc = TLInt.deserialized(_data);
            if (!thisDc) return undefined;
            const nearestDc = TLInt.deserialized(_data);
            if (!nearestDc) return undefined;
            return new NearestDc(
                country,
                thisDc,
                nearestDc)
        }
    
        serialized(): Uint8Array {
            const constructor = NearestDc.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.country.serialized());
            data.push(this.thisDc.serialized());
            data.push(this.nearestDc.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly country: TLString,
            readonly thisDc: TLInt,
            readonly nearestDc: TLInt) {}
    
    } // class NearestDc
    

    export namespace help {
    export class AppUpdate implements TLObject {
        static readonly cons = new TLInt(0x8987f311);
    
        static deserialized(_data: ByteStream): AppUpdate | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(AppUpdate.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const critical = deserializedObject(_data) as BoolType;
            if (!critical) return undefined;
            
            const url = TLString.deserialized(_data);
            if (!url) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            return new AppUpdate(
                id,
                critical,
                url,
                text)
        }
    
        serialized(): Uint8Array {
            const constructor = AppUpdate.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.critical.serialized());
            data.push(this.url.serialized());
            data.push(this.text.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly critical: BoolType,
            readonly url: TLString,
            readonly text: TLString) {}
    
    } // class AppUpdate
    } // namespace help

    export namespace help {
    export class NoAppUpdate implements TLObject {
        static readonly cons = new TLInt(0xc45a6536);
    
        static deserialized(_data: ByteStream): NoAppUpdate | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(NoAppUpdate.cons)) return undefined;
            return new NoAppUpdate()
        }
    
        serialized(): Uint8Array {
            const constructor = NoAppUpdate.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class NoAppUpdate
    } // namespace help

    export namespace help {
    export class InviteText implements TLObject {
        static readonly cons = new TLInt(0x18cb9f78);
    
        static deserialized(_data: ByteStream): InviteText | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InviteText.cons)) return undefined;
            const message = TLString.deserialized(_data);
            if (!message) return undefined;
            return new InviteText(
                message)
        }
    
        serialized(): Uint8Array {
            const constructor = InviteText.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.message.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly message: TLString) {}
    
    } // class InviteText
    } // namespace help

    export class EncryptedChatEmpty implements TLObject {
        static readonly cons = new TLInt(0xab7ec0a0);
    
        static deserialized(_data: ByteStream): EncryptedChatEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(EncryptedChatEmpty.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            return new EncryptedChatEmpty(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = EncryptedChatEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt) {}
    
    } // class EncryptedChatEmpty
    

    export class EncryptedChatWaiting implements TLObject {
        static readonly cons = new TLInt(0x3bf703dc);
    
        static deserialized(_data: ByteStream): EncryptedChatWaiting | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(EncryptedChatWaiting.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const adminId = TLInt.deserialized(_data);
            if (!adminId) return undefined;
            const participantId = TLInt.deserialized(_data);
            if (!participantId) return undefined;
            return new EncryptedChatWaiting(
                id,
                accessHash,
                date,
                adminId,
                participantId)
        }
    
        serialized(): Uint8Array {
            const constructor = EncryptedChatWaiting.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.date.serialized());
            data.push(this.adminId.serialized());
            data.push(this.participantId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly accessHash: TLLong,
            readonly date: TLInt,
            readonly adminId: TLInt,
            readonly participantId: TLInt) {}
    
    } // class EncryptedChatWaiting
    

    export class EncryptedChatRequested implements TLObject {
        static readonly cons = new TLInt(0xc878527e);
    
        static deserialized(_data: ByteStream): EncryptedChatRequested | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(EncryptedChatRequested.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const adminId = TLInt.deserialized(_data);
            if (!adminId) return undefined;
            const participantId = TLInt.deserialized(_data);
            if (!participantId) return undefined;
            const gA = TLBytes.deserialized(_data);
            if (!gA) return undefined;
            return new EncryptedChatRequested(
                id,
                accessHash,
                date,
                adminId,
                participantId,
                gA)
        }
    
        serialized(): Uint8Array {
            const constructor = EncryptedChatRequested.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.date.serialized());
            data.push(this.adminId.serialized());
            data.push(this.participantId.serialized());
            data.push(this.gA.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly accessHash: TLLong,
            readonly date: TLInt,
            readonly adminId: TLInt,
            readonly participantId: TLInt,
            readonly gA: TLBytes) {}
    
    } // class EncryptedChatRequested
    

    export class EncryptedChat implements TLObject {
        static readonly cons = new TLInt(0xfa56ce36);
    
        static deserialized(_data: ByteStream): EncryptedChat | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(EncryptedChat.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const adminId = TLInt.deserialized(_data);
            if (!adminId) return undefined;
            const participantId = TLInt.deserialized(_data);
            if (!participantId) return undefined;
            const gAOrB = TLBytes.deserialized(_data);
            if (!gAOrB) return undefined;
            const keyFingerprint = TLLong.deserialized(_data);
            if (!keyFingerprint) return undefined;
            return new EncryptedChat(
                id,
                accessHash,
                date,
                adminId,
                participantId,
                gAOrB,
                keyFingerprint)
        }
    
        serialized(): Uint8Array {
            const constructor = EncryptedChat.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.date.serialized());
            data.push(this.adminId.serialized());
            data.push(this.participantId.serialized());
            data.push(this.gAOrB.serialized());
            data.push(this.keyFingerprint.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly accessHash: TLLong,
            readonly date: TLInt,
            readonly adminId: TLInt,
            readonly participantId: TLInt,
            readonly gAOrB: TLBytes,
            readonly keyFingerprint: TLLong) {}
    
    } // class EncryptedChat
    

    export class EncryptedChatDiscarded implements TLObject {
        static readonly cons = new TLInt(0x13d6dd27);
    
        static deserialized(_data: ByteStream): EncryptedChatDiscarded | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(EncryptedChatDiscarded.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            return new EncryptedChatDiscarded(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = EncryptedChatDiscarded.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt) {}
    
    } // class EncryptedChatDiscarded
    

    export class InputEncryptedChat implements TLObject {
        static readonly cons = new TLInt(0xf141b5e1);
    
        static deserialized(_data: ByteStream): InputEncryptedChat | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputEncryptedChat.cons)) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputEncryptedChat(
                chatId,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputEncryptedChat.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly accessHash: TLLong) {}
    
    } // class InputEncryptedChat
    

    export class EncryptedFileEmpty implements TLObject {
        static readonly cons = new TLInt(0xc21f497e);
    
        static deserialized(_data: ByteStream): EncryptedFileEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(EncryptedFileEmpty.cons)) return undefined;
            return new EncryptedFileEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = EncryptedFileEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class EncryptedFileEmpty
    

    export class EncryptedFile implements TLObject {
        static readonly cons = new TLInt(0x4a70994c);
    
        static deserialized(_data: ByteStream): EncryptedFile | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(EncryptedFile.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const size = TLInt.deserialized(_data);
            if (!size) return undefined;
            const dcId = TLInt.deserialized(_data);
            if (!dcId) return undefined;
            const keyFingerprint = TLInt.deserialized(_data);
            if (!keyFingerprint) return undefined;
            return new EncryptedFile(
                id,
                accessHash,
                size,
                dcId,
                keyFingerprint)
        }
    
        serialized(): Uint8Array {
            const constructor = EncryptedFile.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.size.serialized());
            data.push(this.dcId.serialized());
            data.push(this.keyFingerprint.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong,
            readonly size: TLInt,
            readonly dcId: TLInt,
            readonly keyFingerprint: TLInt) {}
    
    } // class EncryptedFile
    

    export class InputEncryptedFileEmpty implements TLObject {
        static readonly cons = new TLInt(0x1837c364);
    
        static deserialized(_data: ByteStream): InputEncryptedFileEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputEncryptedFileEmpty.cons)) return undefined;
            return new InputEncryptedFileEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputEncryptedFileEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputEncryptedFileEmpty
    

    export class InputEncryptedFileUploaded implements TLObject {
        static readonly cons = new TLInt(0x64bd0306);
    
        static deserialized(_data: ByteStream): InputEncryptedFileUploaded | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputEncryptedFileUploaded.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const parts = TLInt.deserialized(_data);
            if (!parts) return undefined;
            const md5Checksum = TLString.deserialized(_data);
            if (!md5Checksum) return undefined;
            const keyFingerprint = TLInt.deserialized(_data);
            if (!keyFingerprint) return undefined;
            return new InputEncryptedFileUploaded(
                id,
                parts,
                md5Checksum,
                keyFingerprint)
        }
    
        serialized(): Uint8Array {
            const constructor = InputEncryptedFileUploaded.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.parts.serialized());
            data.push(this.md5Checksum.serialized());
            data.push(this.keyFingerprint.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly parts: TLInt,
            readonly md5Checksum: TLString,
            readonly keyFingerprint: TLInt) {}
    
    } // class InputEncryptedFileUploaded
    

    export class InputEncryptedFile implements TLObject {
        static readonly cons = new TLInt(0x5a17b5e5);
    
        static deserialized(_data: ByteStream): InputEncryptedFile | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputEncryptedFile.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputEncryptedFile(
                id,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputEncryptedFile.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong) {}
    
    } // class InputEncryptedFile
    

    export class InputEncryptedFileBigUploaded implements TLObject {
        static readonly cons = new TLInt(0x2dc173c8);
    
        static deserialized(_data: ByteStream): InputEncryptedFileBigUploaded | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputEncryptedFileBigUploaded.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const parts = TLInt.deserialized(_data);
            if (!parts) return undefined;
            const keyFingerprint = TLInt.deserialized(_data);
            if (!keyFingerprint) return undefined;
            return new InputEncryptedFileBigUploaded(
                id,
                parts,
                keyFingerprint)
        }
    
        serialized(): Uint8Array {
            const constructor = InputEncryptedFileBigUploaded.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.parts.serialized());
            data.push(this.keyFingerprint.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly parts: TLInt,
            readonly keyFingerprint: TLInt) {}
    
    } // class InputEncryptedFileBigUploaded
    

    export class EncryptedMessage implements TLObject {
        static readonly cons = new TLInt(0xed18c118);
    
        static deserialized(_data: ByteStream): EncryptedMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(EncryptedMessage.cons)) return undefined;
            const randomId = TLLong.deserialized(_data);
            if (!randomId) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const bytes = TLBytes.deserialized(_data);
            if (!bytes) return undefined;
            const file = deserializedObject(_data) as EncryptedFileType;
            if (!file) return undefined;
            
            return new EncryptedMessage(
                randomId,
                chatId,
                date,
                bytes,
                file)
        }
    
        serialized(): Uint8Array {
            const constructor = EncryptedMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.randomId.serialized());
            data.push(this.chatId.serialized());
            data.push(this.date.serialized());
            data.push(this.bytes.serialized());
            data.push(this.file.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly randomId: TLLong,
            readonly chatId: TLInt,
            readonly date: TLInt,
            readonly bytes: TLBytes,
            readonly file: EncryptedFileType) {}
    
    } // class EncryptedMessage
    

    export class EncryptedMessageService implements TLObject {
        static readonly cons = new TLInt(0x23734b06);
    
        static deserialized(_data: ByteStream): EncryptedMessageService | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(EncryptedMessageService.cons)) return undefined;
            const randomId = TLLong.deserialized(_data);
            if (!randomId) return undefined;
            const chatId = TLInt.deserialized(_data);
            if (!chatId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const bytes = TLBytes.deserialized(_data);
            if (!bytes) return undefined;
            return new EncryptedMessageService(
                randomId,
                chatId,
                date,
                bytes)
        }
    
        serialized(): Uint8Array {
            const constructor = EncryptedMessageService.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.randomId.serialized());
            data.push(this.chatId.serialized());
            data.push(this.date.serialized());
            data.push(this.bytes.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly randomId: TLLong,
            readonly chatId: TLInt,
            readonly date: TLInt,
            readonly bytes: TLBytes) {}
    
    } // class EncryptedMessageService
    

    export namespace messages {
    export class DhConfigNotModified implements TLObject {
        static readonly cons = new TLInt(0xc0e24635);
    
        static deserialized(_data: ByteStream): DhConfigNotModified | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DhConfigNotModified.cons)) return undefined;
            const random = TLBytes.deserialized(_data);
            if (!random) return undefined;
            return new DhConfigNotModified(
                random)
        }
    
        serialized(): Uint8Array {
            const constructor = DhConfigNotModified.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.random.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly random: TLBytes) {}
    
    } // class DhConfigNotModified
    } // namespace messages

    export namespace messages {
    export class DhConfig implements TLObject {
        static readonly cons = new TLInt(0x2c221edd);
    
        static deserialized(_data: ByteStream): DhConfig | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DhConfig.cons)) return undefined;
            const g = TLInt.deserialized(_data);
            if (!g) return undefined;
            const p = TLBytes.deserialized(_data);
            if (!p) return undefined;
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            const random = TLBytes.deserialized(_data);
            if (!random) return undefined;
            return new DhConfig(
                g,
                p,
                version,
                random)
        }
    
        serialized(): Uint8Array {
            const constructor = DhConfig.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.g.serialized());
            data.push(this.p.serialized());
            data.push(this.version.serialized());
            data.push(this.random.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly g: TLInt,
            readonly p: TLBytes,
            readonly version: TLInt,
            readonly random: TLBytes) {}
    
    } // class DhConfig
    } // namespace messages

    export namespace messages {
    export class SentEncryptedMessage implements TLObject {
        static readonly cons = new TLInt(0x560f8935);
    
        static deserialized(_data: ByteStream): SentEncryptedMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SentEncryptedMessage.cons)) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new SentEncryptedMessage(
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = SentEncryptedMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly date: TLInt) {}
    
    } // class SentEncryptedMessage
    } // namespace messages

    export namespace messages {
    export class SentEncryptedFile implements TLObject {
        static readonly cons = new TLInt(0x9493ff32);
    
        static deserialized(_data: ByteStream): SentEncryptedFile | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SentEncryptedFile.cons)) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const file = deserializedObject(_data) as EncryptedFileType;
            if (!file) return undefined;
            
            return new SentEncryptedFile(
                date,
                file)
        }
    
        serialized(): Uint8Array {
            const constructor = SentEncryptedFile.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.date.serialized());
            data.push(this.file.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly date: TLInt,
            readonly file: EncryptedFileType) {}
    
    } // class SentEncryptedFile
    } // namespace messages

    export class InputDocumentEmpty implements TLObject {
        static readonly cons = new TLInt(0x72f0eaae);
    
        static deserialized(_data: ByteStream): InputDocumentEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputDocumentEmpty.cons)) return undefined;
            return new InputDocumentEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputDocumentEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputDocumentEmpty
    

    export class InputDocument implements TLObject {
        static readonly cons = new TLInt(0x18798952);
    
        static deserialized(_data: ByteStream): InputDocument | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputDocument.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputDocument(
                id,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputDocument.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong) {}
    
    } // class InputDocument
    

    export class DocumentEmpty implements TLObject {
        static readonly cons = new TLInt(0x36f8c871);
    
        static deserialized(_data: ByteStream): DocumentEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DocumentEmpty.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            return new DocumentEmpty(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = DocumentEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong) {}
    
    } // class DocumentEmpty
    

    export class Document implements TLObject {
        static readonly cons = new TLInt(0x87232bc7);
    
        static deserialized(_data: ByteStream): Document | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Document.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            const mimeType = TLString.deserialized(_data);
            if (!mimeType) return undefined;
            const size = TLInt.deserialized(_data);
            if (!size) return undefined;
            const thumb = deserializedObject(_data) as PhotoSizeType;
            if (!thumb) return undefined;
            
            const dcId = TLInt.deserialized(_data);
            if (!dcId) return undefined;
            const version = TLInt.deserialized(_data);
            if (!version) return undefined;
            const attributes = TLVector.deserialized(_data, ) as TLVector<DocumentAttributeType>;
            if (!attributes) return undefined;
            return new Document(
                id,
                accessHash,
                date,
                mimeType,
                size,
                thumb,
                dcId,
                version,
                attributes)
        }
    
        serialized(): Uint8Array {
            const constructor = Document.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.date.serialized());
            data.push(this.mimeType.serialized());
            data.push(this.size.serialized());
            data.push(this.thumb.serialized());
            data.push(this.dcId.serialized());
            data.push(this.version.serialized());
            data.push(this.attributes.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong,
            readonly date: TLInt,
            readonly mimeType: TLString,
            readonly size: TLInt,
            readonly thumb: PhotoSizeType,
            readonly dcId: TLInt,
            readonly version: TLInt,
            readonly attributes: TLVector<DocumentAttributeType>) {}
    
    } // class Document
    

    export namespace help {
    export class Support implements TLObject {
        static readonly cons = new TLInt(0x17c6b5f6);
    
        static deserialized(_data: ByteStream): Support | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Support.cons)) return undefined;
            const phoneNumber = TLString.deserialized(_data);
            if (!phoneNumber) return undefined;
            const user = deserializedObject(_data) as UserType;
            if (!user) return undefined;
            
            return new Support(
                phoneNumber,
                user)
        }
    
        serialized(): Uint8Array {
            const constructor = Support.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumber.serialized());
            data.push(this.user.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly user: UserType) {}
    
    } // class Support
    } // namespace help

    export class NotifyPeer implements TLObject {
        static readonly cons = new TLInt(0x9fd40bd8);
    
        static deserialized(_data: ByteStream): NotifyPeer | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(NotifyPeer.cons)) return undefined;
            const peer = deserializedObject(_data) as PeerType;
            if (!peer) return undefined;
            
            return new NotifyPeer(
                peer)
        }
    
        serialized(): Uint8Array {
            const constructor = NotifyPeer.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: PeerType) {}
    
    } // class NotifyPeer
    

    export class NotifyUsers implements TLObject {
        static readonly cons = new TLInt(0xb4c83b4c);
    
        static deserialized(_data: ByteStream): NotifyUsers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(NotifyUsers.cons)) return undefined;
            return new NotifyUsers()
        }
    
        serialized(): Uint8Array {
            const constructor = NotifyUsers.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class NotifyUsers
    

    export class NotifyChats implements TLObject {
        static readonly cons = new TLInt(0xc007cec3);
    
        static deserialized(_data: ByteStream): NotifyChats | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(NotifyChats.cons)) return undefined;
            return new NotifyChats()
        }
    
        serialized(): Uint8Array {
            const constructor = NotifyChats.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class NotifyChats
    

    export class NotifyAll implements TLObject {
        static readonly cons = new TLInt(0x74d07c60);
    
        static deserialized(_data: ByteStream): NotifyAll | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(NotifyAll.cons)) return undefined;
            return new NotifyAll()
        }
    
        serialized(): Uint8Array {
            const constructor = NotifyAll.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class NotifyAll
    

    export class SendMessageTypingAction implements TLObject {
        static readonly cons = new TLInt(0x16bf744e);
    
        static deserialized(_data: ByteStream): SendMessageTypingAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageTypingAction.cons)) return undefined;
            return new SendMessageTypingAction()
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageTypingAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class SendMessageTypingAction
    

    export class SendMessageCancelAction implements TLObject {
        static readonly cons = new TLInt(0xfd5ec8f5);
    
        static deserialized(_data: ByteStream): SendMessageCancelAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageCancelAction.cons)) return undefined;
            return new SendMessageCancelAction()
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageCancelAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class SendMessageCancelAction
    

    export class SendMessageRecordVideoAction implements TLObject {
        static readonly cons = new TLInt(0xa187d66f);
    
        static deserialized(_data: ByteStream): SendMessageRecordVideoAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageRecordVideoAction.cons)) return undefined;
            return new SendMessageRecordVideoAction()
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageRecordVideoAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class SendMessageRecordVideoAction
    

    export class SendMessageUploadVideoAction implements TLObject {
        static readonly cons = new TLInt(0xe9763aec);
    
        static deserialized(_data: ByteStream): SendMessageUploadVideoAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageUploadVideoAction.cons)) return undefined;
            const progress = TLInt.deserialized(_data);
            if (!progress) return undefined;
            return new SendMessageUploadVideoAction(
                progress)
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageUploadVideoAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.progress.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly progress: TLInt) {}
    
    } // class SendMessageUploadVideoAction
    

    export class SendMessageRecordAudioAction implements TLObject {
        static readonly cons = new TLInt(0xd52f73f7);
    
        static deserialized(_data: ByteStream): SendMessageRecordAudioAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageRecordAudioAction.cons)) return undefined;
            return new SendMessageRecordAudioAction()
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageRecordAudioAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class SendMessageRecordAudioAction
    

    export class SendMessageUploadAudioAction implements TLObject {
        static readonly cons = new TLInt(0xf351d7ab);
    
        static deserialized(_data: ByteStream): SendMessageUploadAudioAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageUploadAudioAction.cons)) return undefined;
            const progress = TLInt.deserialized(_data);
            if (!progress) return undefined;
            return new SendMessageUploadAudioAction(
                progress)
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageUploadAudioAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.progress.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly progress: TLInt) {}
    
    } // class SendMessageUploadAudioAction
    

    export class SendMessageUploadPhotoAction implements TLObject {
        static readonly cons = new TLInt(0xd1d34a26);
    
        static deserialized(_data: ByteStream): SendMessageUploadPhotoAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageUploadPhotoAction.cons)) return undefined;
            const progress = TLInt.deserialized(_data);
            if (!progress) return undefined;
            return new SendMessageUploadPhotoAction(
                progress)
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageUploadPhotoAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.progress.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly progress: TLInt) {}
    
    } // class SendMessageUploadPhotoAction
    

    export class SendMessageUploadDocumentAction implements TLObject {
        static readonly cons = new TLInt(0xaa0cd9e4);
    
        static deserialized(_data: ByteStream): SendMessageUploadDocumentAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageUploadDocumentAction.cons)) return undefined;
            const progress = TLInt.deserialized(_data);
            if (!progress) return undefined;
            return new SendMessageUploadDocumentAction(
                progress)
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageUploadDocumentAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.progress.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly progress: TLInt) {}
    
    } // class SendMessageUploadDocumentAction
    

    export class SendMessageGeoLocationAction implements TLObject {
        static readonly cons = new TLInt(0x176f8ba1);
    
        static deserialized(_data: ByteStream): SendMessageGeoLocationAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageGeoLocationAction.cons)) return undefined;
            return new SendMessageGeoLocationAction()
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageGeoLocationAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class SendMessageGeoLocationAction
    

    export class SendMessageChooseContactAction implements TLObject {
        static readonly cons = new TLInt(0x628cbc6f);
    
        static deserialized(_data: ByteStream): SendMessageChooseContactAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageChooseContactAction.cons)) return undefined;
            return new SendMessageChooseContactAction()
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageChooseContactAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class SendMessageChooseContactAction
    

    export class SendMessageGamePlayAction implements TLObject {
        static readonly cons = new TLInt(0xdd6a8f48);
    
        static deserialized(_data: ByteStream): SendMessageGamePlayAction | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SendMessageGamePlayAction.cons)) return undefined;
            return new SendMessageGamePlayAction()
        }
    
        serialized(): Uint8Array {
            const constructor = SendMessageGamePlayAction.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class SendMessageGamePlayAction
    

    export namespace contacts {
    export class Found implements TLObject {
        static readonly cons = new TLInt(0x1aa1f784);
    
        static deserialized(_data: ByteStream): Found | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Found.cons)) return undefined;
            const results = TLVector.deserialized(_data, ) as TLVector<PeerType>;
            if (!results) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new Found(
                results,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = Found.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.results.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly results: TLVector<PeerType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class Found
    } // namespace contacts

    export class InputPrivacyKeyStatusTimestamp implements TLObject {
        static readonly cons = new TLInt(0x4f96cb18);
    
        static deserialized(_data: ByteStream): InputPrivacyKeyStatusTimestamp | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPrivacyKeyStatusTimestamp.cons)) return undefined;
            return new InputPrivacyKeyStatusTimestamp()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPrivacyKeyStatusTimestamp.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPrivacyKeyStatusTimestamp
    

    export class InputPrivacyKeyChatInvite implements TLObject {
        static readonly cons = new TLInt(0xbdfb0426);
    
        static deserialized(_data: ByteStream): InputPrivacyKeyChatInvite | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPrivacyKeyChatInvite.cons)) return undefined;
            return new InputPrivacyKeyChatInvite()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPrivacyKeyChatInvite.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPrivacyKeyChatInvite
    

    export class PrivacyKeyStatusTimestamp implements TLObject {
        static readonly cons = new TLInt(0xbc2eab30);
    
        static deserialized(_data: ByteStream): PrivacyKeyStatusTimestamp | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PrivacyKeyStatusTimestamp.cons)) return undefined;
            return new PrivacyKeyStatusTimestamp()
        }
    
        serialized(): Uint8Array {
            const constructor = PrivacyKeyStatusTimestamp.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class PrivacyKeyStatusTimestamp
    

    export class PrivacyKeyChatInvite implements TLObject {
        static readonly cons = new TLInt(0x500e6dfa);
    
        static deserialized(_data: ByteStream): PrivacyKeyChatInvite | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PrivacyKeyChatInvite.cons)) return undefined;
            return new PrivacyKeyChatInvite()
        }
    
        serialized(): Uint8Array {
            const constructor = PrivacyKeyChatInvite.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class PrivacyKeyChatInvite
    

    export class InputPrivacyValueAllowContacts implements TLObject {
        static readonly cons = new TLInt(0xd09e07b);
    
        static deserialized(_data: ByteStream): InputPrivacyValueAllowContacts | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPrivacyValueAllowContacts.cons)) return undefined;
            return new InputPrivacyValueAllowContacts()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPrivacyValueAllowContacts.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPrivacyValueAllowContacts
    

    export class InputPrivacyValueAllowAll implements TLObject {
        static readonly cons = new TLInt(0x184b35ce);
    
        static deserialized(_data: ByteStream): InputPrivacyValueAllowAll | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPrivacyValueAllowAll.cons)) return undefined;
            return new InputPrivacyValueAllowAll()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPrivacyValueAllowAll.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPrivacyValueAllowAll
    

    export class InputPrivacyValueAllowUsers implements TLObject {
        static readonly cons = new TLInt(0x131cc67f);
    
        static deserialized(_data: ByteStream): InputPrivacyValueAllowUsers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPrivacyValueAllowUsers.cons)) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<InputUserType>;
            if (!users) return undefined;
            return new InputPrivacyValueAllowUsers(
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = InputPrivacyValueAllowUsers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly users: TLVector<InputUserType>) {}
    
    } // class InputPrivacyValueAllowUsers
    

    export class InputPrivacyValueDisallowContacts implements TLObject {
        static readonly cons = new TLInt(0xba52007);
    
        static deserialized(_data: ByteStream): InputPrivacyValueDisallowContacts | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPrivacyValueDisallowContacts.cons)) return undefined;
            return new InputPrivacyValueDisallowContacts()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPrivacyValueDisallowContacts.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPrivacyValueDisallowContacts
    

    export class InputPrivacyValueDisallowAll implements TLObject {
        static readonly cons = new TLInt(0xd66b66c9);
    
        static deserialized(_data: ByteStream): InputPrivacyValueDisallowAll | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPrivacyValueDisallowAll.cons)) return undefined;
            return new InputPrivacyValueDisallowAll()
        }
    
        serialized(): Uint8Array {
            const constructor = InputPrivacyValueDisallowAll.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputPrivacyValueDisallowAll
    

    export class InputPrivacyValueDisallowUsers implements TLObject {
        static readonly cons = new TLInt(0x90110467);
    
        static deserialized(_data: ByteStream): InputPrivacyValueDisallowUsers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputPrivacyValueDisallowUsers.cons)) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<InputUserType>;
            if (!users) return undefined;
            return new InputPrivacyValueDisallowUsers(
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = InputPrivacyValueDisallowUsers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly users: TLVector<InputUserType>) {}
    
    } // class InputPrivacyValueDisallowUsers
    

    export class PrivacyValueAllowContacts implements TLObject {
        static readonly cons = new TLInt(0xfffe1bac);
    
        static deserialized(_data: ByteStream): PrivacyValueAllowContacts | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PrivacyValueAllowContacts.cons)) return undefined;
            return new PrivacyValueAllowContacts()
        }
    
        serialized(): Uint8Array {
            const constructor = PrivacyValueAllowContacts.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class PrivacyValueAllowContacts
    

    export class PrivacyValueAllowAll implements TLObject {
        static readonly cons = new TLInt(0x65427b82);
    
        static deserialized(_data: ByteStream): PrivacyValueAllowAll | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PrivacyValueAllowAll.cons)) return undefined;
            return new PrivacyValueAllowAll()
        }
    
        serialized(): Uint8Array {
            const constructor = PrivacyValueAllowAll.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class PrivacyValueAllowAll
    

    export class PrivacyValueAllowUsers implements TLObject {
        static readonly cons = new TLInt(0x4d5bbe0c);
    
        static deserialized(_data: ByteStream): PrivacyValueAllowUsers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PrivacyValueAllowUsers.cons)) return undefined;
            const users = TLVector.deserialized(_data, TLInt) as TLVector<TLInt>;
            if (!users) return undefined;
            return new PrivacyValueAllowUsers(
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = PrivacyValueAllowUsers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly users: TLVector<TLInt>) {}
    
    } // class PrivacyValueAllowUsers
    

    export class PrivacyValueDisallowContacts implements TLObject {
        static readonly cons = new TLInt(0xf888fa1a);
    
        static deserialized(_data: ByteStream): PrivacyValueDisallowContacts | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PrivacyValueDisallowContacts.cons)) return undefined;
            return new PrivacyValueDisallowContacts()
        }
    
        serialized(): Uint8Array {
            const constructor = PrivacyValueDisallowContacts.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class PrivacyValueDisallowContacts
    

    export class PrivacyValueDisallowAll implements TLObject {
        static readonly cons = new TLInt(0x8b73e763);
    
        static deserialized(_data: ByteStream): PrivacyValueDisallowAll | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PrivacyValueDisallowAll.cons)) return undefined;
            return new PrivacyValueDisallowAll()
        }
    
        serialized(): Uint8Array {
            const constructor = PrivacyValueDisallowAll.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class PrivacyValueDisallowAll
    

    export class PrivacyValueDisallowUsers implements TLObject {
        static readonly cons = new TLInt(0xc7f49b7);
    
        static deserialized(_data: ByteStream): PrivacyValueDisallowUsers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PrivacyValueDisallowUsers.cons)) return undefined;
            const users = TLVector.deserialized(_data, TLInt) as TLVector<TLInt>;
            if (!users) return undefined;
            return new PrivacyValueDisallowUsers(
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = PrivacyValueDisallowUsers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly users: TLVector<TLInt>) {}
    
    } // class PrivacyValueDisallowUsers
    

    export namespace account {
    export class PrivacyRules implements TLObject {
        static readonly cons = new TLInt(0x554abb6f);
    
        static deserialized(_data: ByteStream): PrivacyRules | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PrivacyRules.cons)) return undefined;
            const rules = TLVector.deserialized(_data, ) as TLVector<PrivacyRuleType>;
            if (!rules) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new PrivacyRules(
                rules,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = PrivacyRules.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.rules.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly rules: TLVector<PrivacyRuleType>,
            readonly users: TLVector<UserType>) {}
    
    } // class PrivacyRules
    } // namespace account

    export class AccountDaysTTL implements TLObject {
        static readonly cons = new TLInt(0xb8d0afdf);
    
        static deserialized(_data: ByteStream): AccountDaysTTL | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(AccountDaysTTL.cons)) return undefined;
            const days = TLInt.deserialized(_data);
            if (!days) return undefined;
            return new AccountDaysTTL(
                days)
        }
    
        serialized(): Uint8Array {
            const constructor = AccountDaysTTL.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.days.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly days: TLInt) {}
    
    } // class AccountDaysTTL
    

    export class DocumentAttributeImageSize implements TLObject {
        static readonly cons = new TLInt(0x6c37c15c);
    
        static deserialized(_data: ByteStream): DocumentAttributeImageSize | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DocumentAttributeImageSize.cons)) return undefined;
            const w = TLInt.deserialized(_data);
            if (!w) return undefined;
            const h = TLInt.deserialized(_data);
            if (!h) return undefined;
            return new DocumentAttributeImageSize(
                w,
                h)
        }
    
        serialized(): Uint8Array {
            const constructor = DocumentAttributeImageSize.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.w.serialized());
            data.push(this.h.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly w: TLInt,
            readonly h: TLInt) {}
    
    } // class DocumentAttributeImageSize
    

    export class DocumentAttributeAnimated implements TLObject {
        static readonly cons = new TLInt(0x11b58939);
    
        static deserialized(_data: ByteStream): DocumentAttributeAnimated | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DocumentAttributeAnimated.cons)) return undefined;
            return new DocumentAttributeAnimated()
        }
    
        serialized(): Uint8Array {
            const constructor = DocumentAttributeAnimated.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class DocumentAttributeAnimated
    

    export class DocumentAttributeSticker implements TLObject {
        static readonly cons = new TLInt(0x6319d612);
    
        static deserialized(_data: ByteStream): DocumentAttributeSticker | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DocumentAttributeSticker.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const mask = (flags.value & 2) !== 0;
            const alt = TLString.deserialized(_data);
            if (!alt) return undefined;
            const stickerset = deserializedObject(_data) as InputStickerSetType;
            if (!stickerset) return undefined;
            
            let maskCoords: MaskCoords | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = deserializedObject(_data) as MaskCoords;
                if (!obj) return undefined;
                maskCoords = obj
            }
            return new DocumentAttributeSticker(
                mask,
                alt,
                stickerset,
                maskCoords)
        }
    
        serialized(): Uint8Array {
            const constructor = DocumentAttributeSticker.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.mask) ? (flags | 2) : (flags & ~2);
            flags = (!this.maskCoords) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.alt.serialized());
            data.push(this.stickerset.serialized());
            if (this.maskCoords) data.push(this.maskCoords.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly mask: boolean,
            readonly alt: TLString,
            readonly stickerset: InputStickerSetType,
            readonly maskCoords: MaskCoords | undefined) {}
    
    } // class DocumentAttributeSticker
    

    export class DocumentAttributeVideo implements TLObject {
        static readonly cons = new TLInt(0x5910cccb);
    
        static deserialized(_data: ByteStream): DocumentAttributeVideo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DocumentAttributeVideo.cons)) return undefined;
            const duration = TLInt.deserialized(_data);
            if (!duration) return undefined;
            const w = TLInt.deserialized(_data);
            if (!w) return undefined;
            const h = TLInt.deserialized(_data);
            if (!h) return undefined;
            return new DocumentAttributeVideo(
                duration,
                w,
                h)
        }
    
        serialized(): Uint8Array {
            const constructor = DocumentAttributeVideo.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.duration.serialized());
            data.push(this.w.serialized());
            data.push(this.h.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly duration: TLInt,
            readonly w: TLInt,
            readonly h: TLInt) {}
    
    } // class DocumentAttributeVideo
    

    export class DocumentAttributeAudio implements TLObject {
        static readonly cons = new TLInt(0x9852f9c6);
    
        static deserialized(_data: ByteStream): DocumentAttributeAudio | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DocumentAttributeAudio.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const voice = (flags.value & 1024) !== 0;
            const duration = TLInt.deserialized(_data);
            if (!duration) return undefined;
            let title: TLString | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                title = obj
            }
            let performer: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                performer = obj
            }
            let waveform: TLBytes | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLBytes.deserialized(_data);
                if (!obj) return undefined;
                waveform = obj
            }
            return new DocumentAttributeAudio(
                voice,
                duration,
                title,
                performer,
                waveform)
        }
    
        serialized(): Uint8Array {
            const constructor = DocumentAttributeAudio.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.voice) ? (flags | 1024) : (flags & ~1024);
            flags = (!this.title) ? (flags | 1) : (flags & ~1);
            flags = (!this.performer) ? (flags | 2) : (flags & ~2);
            flags = (!this.waveform) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.duration.serialized());
            if (this.title) data.push(this.title.serialized());
            if (this.performer) data.push(this.performer.serialized());
            if (this.waveform) data.push(this.waveform.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly voice: boolean,
            readonly duration: TLInt,
            readonly title: TLString | undefined,
            readonly performer: TLString | undefined,
            readonly waveform: TLBytes | undefined) {}
    
    } // class DocumentAttributeAudio
    

    export class DocumentAttributeFilename implements TLObject {
        static readonly cons = new TLInt(0x15590068);
    
        static deserialized(_data: ByteStream): DocumentAttributeFilename | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DocumentAttributeFilename.cons)) return undefined;
            const fileName = TLString.deserialized(_data);
            if (!fileName) return undefined;
            return new DocumentAttributeFilename(
                fileName)
        }
    
        serialized(): Uint8Array {
            const constructor = DocumentAttributeFilename.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.fileName.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly fileName: TLString) {}
    
    } // class DocumentAttributeFilename
    

    export class DocumentAttributeHasStickers implements TLObject {
        static readonly cons = new TLInt(0x9801d2f7);
    
        static deserialized(_data: ByteStream): DocumentAttributeHasStickers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DocumentAttributeHasStickers.cons)) return undefined;
            return new DocumentAttributeHasStickers()
        }
    
        serialized(): Uint8Array {
            const constructor = DocumentAttributeHasStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class DocumentAttributeHasStickers
    

    export namespace messages {
    export class StickersNotModified implements TLObject {
        static readonly cons = new TLInt(0xf1749a22);
    
        static deserialized(_data: ByteStream): StickersNotModified | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(StickersNotModified.cons)) return undefined;
            return new StickersNotModified()
        }
    
        serialized(): Uint8Array {
            const constructor = StickersNotModified.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class StickersNotModified
    } // namespace messages

    export namespace messages {
    export class Stickers implements TLObject {
        static readonly cons = new TLInt(0x8a8ecd32);
    
        static deserialized(_data: ByteStream): Stickers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Stickers.cons)) return undefined;
            const hash = TLString.deserialized(_data);
            if (!hash) return undefined;
            const stickers = TLVector.deserialized(_data, ) as TLVector<DocumentType>;
            if (!stickers) return undefined;
            return new Stickers(
                hash,
                stickers)
        }
    
        serialized(): Uint8Array {
            const constructor = Stickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
            data.push(this.stickers.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLString,
            readonly stickers: TLVector<DocumentType>) {}
    
    } // class Stickers
    } // namespace messages

    export class StickerPack implements TLObject {
        static readonly cons = new TLInt(0x12b299d4);
    
        static deserialized(_data: ByteStream): StickerPack | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(StickerPack.cons)) return undefined;
            const emoticon = TLString.deserialized(_data);
            if (!emoticon) return undefined;
            const documents = TLVector.deserialized(_data, TLLong) as TLVector<TLLong>;
            if (!documents) return undefined;
            return new StickerPack(
                emoticon,
                documents)
        }
    
        serialized(): Uint8Array {
            const constructor = StickerPack.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.emoticon.serialized());
            data.push(this.documents.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly emoticon: TLString,
            readonly documents: TLVector<TLLong>) {}
    
    } // class StickerPack
    

    export namespace messages {
    export class AllStickersNotModified implements TLObject {
        static readonly cons = new TLInt(0xe86602c3);
    
        static deserialized(_data: ByteStream): AllStickersNotModified | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(AllStickersNotModified.cons)) return undefined;
            return new AllStickersNotModified()
        }
    
        serialized(): Uint8Array {
            const constructor = AllStickersNotModified.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class AllStickersNotModified
    } // namespace messages

    export namespace messages {
    export class AllStickers implements TLObject {
        static readonly cons = new TLInt(0xedfd405f);
    
        static deserialized(_data: ByteStream): AllStickers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(AllStickers.cons)) return undefined;
            const hash = TLInt.deserialized(_data);
            if (!hash) return undefined;
            const sets = TLVector.deserialized(_data, StickerSet) as TLVector<StickerSet>;
            if (!sets) return undefined;
            return new AllStickers(
                hash,
                sets)
        }
    
        serialized(): Uint8Array {
            const constructor = AllStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
            data.push(this.sets.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLInt,
            readonly sets: TLVector<StickerSet>) {}
    
    } // class AllStickers
    } // namespace messages

    export class DisabledFeature implements TLObject {
        static readonly cons = new TLInt(0xae636f24);
    
        static deserialized(_data: ByteStream): DisabledFeature | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DisabledFeature.cons)) return undefined;
            const feature = TLString.deserialized(_data);
            if (!feature) return undefined;
            const description = TLString.deserialized(_data);
            if (!description) return undefined;
            return new DisabledFeature(
                feature,
                description)
        }
    
        serialized(): Uint8Array {
            const constructor = DisabledFeature.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.feature.serialized());
            data.push(this.description.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly feature: TLString,
            readonly description: TLString) {}
    
    } // class DisabledFeature
    

    export namespace messages {
    export class AffectedMessages implements TLObject {
        static readonly cons = new TLInt(0x84d19185);
    
        static deserialized(_data: ByteStream): AffectedMessages | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(AffectedMessages.cons)) return undefined;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            const ptsCount = TLInt.deserialized(_data);
            if (!ptsCount) return undefined;
            return new AffectedMessages(
                pts,
                ptsCount)
        }
    
        serialized(): Uint8Array {
            const constructor = AffectedMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.pts.serialized());
            data.push(this.ptsCount.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly pts: TLInt,
            readonly ptsCount: TLInt) {}
    
    } // class AffectedMessages
    } // namespace messages

    export class ContactLinkUnknown implements TLObject {
        static readonly cons = new TLInt(0x5f4f9247);
    
        static deserialized(_data: ByteStream): ContactLinkUnknown | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ContactLinkUnknown.cons)) return undefined;
            return new ContactLinkUnknown()
        }
    
        serialized(): Uint8Array {
            const constructor = ContactLinkUnknown.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ContactLinkUnknown
    

    export class ContactLinkNone implements TLObject {
        static readonly cons = new TLInt(0xfeedd3ad);
    
        static deserialized(_data: ByteStream): ContactLinkNone | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ContactLinkNone.cons)) return undefined;
            return new ContactLinkNone()
        }
    
        serialized(): Uint8Array {
            const constructor = ContactLinkNone.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ContactLinkNone
    

    export class ContactLinkHasPhone implements TLObject {
        static readonly cons = new TLInt(0x268f3f59);
    
        static deserialized(_data: ByteStream): ContactLinkHasPhone | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ContactLinkHasPhone.cons)) return undefined;
            return new ContactLinkHasPhone()
        }
    
        serialized(): Uint8Array {
            const constructor = ContactLinkHasPhone.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ContactLinkHasPhone
    

    export class ContactLinkContact implements TLObject {
        static readonly cons = new TLInt(0xd502c2d0);
    
        static deserialized(_data: ByteStream): ContactLinkContact | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ContactLinkContact.cons)) return undefined;
            return new ContactLinkContact()
        }
    
        serialized(): Uint8Array {
            const constructor = ContactLinkContact.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ContactLinkContact
    

    export class WebPageEmpty implements TLObject {
        static readonly cons = new TLInt(0xeb1477e8);
    
        static deserialized(_data: ByteStream): WebPageEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(WebPageEmpty.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            return new WebPageEmpty(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = WebPageEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong) {}
    
    } // class WebPageEmpty
    

    export class WebPagePending implements TLObject {
        static readonly cons = new TLInt(0xc586da1c);
    
        static deserialized(_data: ByteStream): WebPagePending | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(WebPagePending.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new WebPagePending(
                id,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = WebPagePending.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly date: TLInt) {}
    
    } // class WebPagePending
    

    export class WebPage implements TLObject {
        static readonly cons = new TLInt(0xca820ed7);
    
        static deserialized(_data: ByteStream): WebPage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(WebPage.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const url = TLString.deserialized(_data);
            if (!url) return undefined;
            const displayUrl = TLString.deserialized(_data);
            if (!displayUrl) return undefined;
            let type: TLString | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                type = obj
            }
            let siteName: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                siteName = obj
            }
            let title: TLString | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                title = obj
            }
            let description: TLString | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                description = obj
            }
            let photo: PhotoType | undefined;
            if ((flags.value & 16) !== 0) {
                const obj = deserializedObject(_data) as PhotoType;
                if (!obj) return undefined;
                photo = obj
            }
            let embedUrl: TLString | undefined;
            if ((flags.value & 32) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                embedUrl = obj
            }
            let embedType: TLString | undefined;
            if ((flags.value & 32) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                embedType = obj
            }
            let embedWidth: TLInt | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                embedWidth = obj
            }
            let embedHeight: TLInt | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                embedHeight = obj
            }
            let duration: TLInt | undefined;
            if ((flags.value & 128) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                duration = obj
            }
            let author: TLString | undefined;
            if ((flags.value & 256) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                author = obj
            }
            let document: DocumentType | undefined;
            if ((flags.value & 512) !== 0) {
                const obj = deserializedObject(_data) as DocumentType;
                if (!obj) return undefined;
                document = obj
            }
            return new WebPage(
                id,
                url,
                displayUrl,
                type,
                siteName,
                title,
                description,
                photo,
                embedUrl,
                embedType,
                embedWidth,
                embedHeight,
                duration,
                author,
                document)
        }
    
        serialized(): Uint8Array {
            const constructor = WebPage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.type) ? (flags | 1) : (flags & ~1);
            flags = (!this.siteName) ? (flags | 2) : (flags & ~2);
            flags = (!this.title) ? (flags | 4) : (flags & ~4);
            flags = (!this.description) ? (flags | 8) : (flags & ~8);
            flags = (!this.photo) ? (flags | 16) : (flags & ~16);
            flags = (!this.embedUrl) ? (flags | 32) : (flags & ~32);
            flags = (!this.embedType) ? (flags | 32) : (flags & ~32);
            flags = (!this.embedWidth) ? (flags | 64) : (flags & ~64);
            flags = (!this.embedHeight) ? (flags | 64) : (flags & ~64);
            flags = (!this.duration) ? (flags | 128) : (flags & ~128);
            flags = (!this.author) ? (flags | 256) : (flags & ~256);
            flags = (!this.document) ? (flags | 512) : (flags & ~512);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.url.serialized());
            data.push(this.displayUrl.serialized());
            if (this.type) data.push(this.type.serialized());
            if (this.siteName) data.push(this.siteName.serialized());
            if (this.title) data.push(this.title.serialized());
            if (this.description) data.push(this.description.serialized());
            if (this.photo) data.push(this.photo.serialized());
            if (this.embedUrl) data.push(this.embedUrl.serialized());
            if (this.embedType) data.push(this.embedType.serialized());
            if (this.embedWidth) data.push(this.embedWidth.serialized());
            if (this.embedHeight) data.push(this.embedHeight.serialized());
            if (this.duration) data.push(this.duration.serialized());
            if (this.author) data.push(this.author.serialized());
            if (this.document) data.push(this.document.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly url: TLString,
            readonly displayUrl: TLString,
            readonly type: TLString | undefined,
            readonly siteName: TLString | undefined,
            readonly title: TLString | undefined,
            readonly description: TLString | undefined,
            readonly photo: PhotoType | undefined,
            readonly embedUrl: TLString | undefined,
            readonly embedType: TLString | undefined,
            readonly embedWidth: TLInt | undefined,
            readonly embedHeight: TLInt | undefined,
            readonly duration: TLInt | undefined,
            readonly author: TLString | undefined,
            readonly document: DocumentType | undefined) {}
    
    } // class WebPage
    

    export class Authorization implements TLObject {
        static readonly cons = new TLInt(0x7bf2e6f6);
    
        static deserialized(_data: ByteStream): Authorization | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Authorization.cons)) return undefined;
            const hash = TLLong.deserialized(_data);
            if (!hash) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const deviceModel = TLString.deserialized(_data);
            if (!deviceModel) return undefined;
            const platform = TLString.deserialized(_data);
            if (!platform) return undefined;
            const systemVersion = TLString.deserialized(_data);
            if (!systemVersion) return undefined;
            const apiId = TLInt.deserialized(_data);
            if (!apiId) return undefined;
            const appName = TLString.deserialized(_data);
            if (!appName) return undefined;
            const appVersion = TLString.deserialized(_data);
            if (!appVersion) return undefined;
            const dateCreated = TLInt.deserialized(_data);
            if (!dateCreated) return undefined;
            const dateActive = TLInt.deserialized(_data);
            if (!dateActive) return undefined;
            const ip = TLString.deserialized(_data);
            if (!ip) return undefined;
            const country = TLString.deserialized(_data);
            if (!country) return undefined;
            const region = TLString.deserialized(_data);
            if (!region) return undefined;
            return new Authorization(
                hash,
                flags,
                deviceModel,
                platform,
                systemVersion,
                apiId,
                appName,
                appVersion,
                dateCreated,
                dateActive,
                ip,
                country,
                region)
        }
    
        serialized(): Uint8Array {
            const constructor = Authorization.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
            data.push(this.flags.serialized());
            data.push(this.deviceModel.serialized());
            data.push(this.platform.serialized());
            data.push(this.systemVersion.serialized());
            data.push(this.apiId.serialized());
            data.push(this.appName.serialized());
            data.push(this.appVersion.serialized());
            data.push(this.dateCreated.serialized());
            data.push(this.dateActive.serialized());
            data.push(this.ip.serialized());
            data.push(this.country.serialized());
            data.push(this.region.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLLong,
            readonly flags: TLInt,
            readonly deviceModel: TLString,
            readonly platform: TLString,
            readonly systemVersion: TLString,
            readonly apiId: TLInt,
            readonly appName: TLString,
            readonly appVersion: TLString,
            readonly dateCreated: TLInt,
            readonly dateActive: TLInt,
            readonly ip: TLString,
            readonly country: TLString,
            readonly region: TLString) {}
    
    } // class Authorization
    

    export namespace account {
    export class Authorizations implements TLObject {
        static readonly cons = new TLInt(0x1250abde);
    
        static deserialized(_data: ByteStream): Authorizations | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Authorizations.cons)) return undefined;
            const authorizations = TLVector.deserialized(_data, Authorization) as TLVector<Authorization>;
            if (!authorizations) return undefined;
            return new Authorizations(
                authorizations)
        }
    
        serialized(): Uint8Array {
            const constructor = Authorizations.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.authorizations.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly authorizations: TLVector<Authorization>) {}
    
    } // class Authorizations
    } // namespace account

    export namespace account {
    export class NoPassword implements TLObject {
        static readonly cons = new TLInt(0x96dabc18);
    
        static deserialized(_data: ByteStream): NoPassword | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(NoPassword.cons)) return undefined;
            const newSalt = TLBytes.deserialized(_data);
            if (!newSalt) return undefined;
            const emailUnconfirmedPattern = TLString.deserialized(_data);
            if (!emailUnconfirmedPattern) return undefined;
            return new NoPassword(
                newSalt,
                emailUnconfirmedPattern)
        }
    
        serialized(): Uint8Array {
            const constructor = NoPassword.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.newSalt.serialized());
            data.push(this.emailUnconfirmedPattern.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly newSalt: TLBytes,
            readonly emailUnconfirmedPattern: TLString) {}
    
    } // class NoPassword
    } // namespace account

    export namespace account {
    export class Password implements TLObject {
        static readonly cons = new TLInt(0x7c18141c);
    
        static deserialized(_data: ByteStream): Password | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Password.cons)) return undefined;
            const currentSalt = TLBytes.deserialized(_data);
            if (!currentSalt) return undefined;
            const newSalt = TLBytes.deserialized(_data);
            if (!newSalt) return undefined;
            const hint = TLString.deserialized(_data);
            if (!hint) return undefined;
            const hasRecovery = deserializedObject(_data) as BoolType;
            if (!hasRecovery) return undefined;
            
            const emailUnconfirmedPattern = TLString.deserialized(_data);
            if (!emailUnconfirmedPattern) return undefined;
            return new Password(
                currentSalt,
                newSalt,
                hint,
                hasRecovery,
                emailUnconfirmedPattern)
        }
    
        serialized(): Uint8Array {
            const constructor = Password.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.currentSalt.serialized());
            data.push(this.newSalt.serialized());
            data.push(this.hint.serialized());
            data.push(this.hasRecovery.serialized());
            data.push(this.emailUnconfirmedPattern.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly currentSalt: TLBytes,
            readonly newSalt: TLBytes,
            readonly hint: TLString,
            readonly hasRecovery: BoolType,
            readonly emailUnconfirmedPattern: TLString) {}
    
    } // class Password
    } // namespace account

    export namespace account {
    export class PasswordSettings implements TLObject {
        static readonly cons = new TLInt(0xb7b72ab3);
    
        static deserialized(_data: ByteStream): PasswordSettings | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PasswordSettings.cons)) return undefined;
            const email = TLString.deserialized(_data);
            if (!email) return undefined;
            return new PasswordSettings(
                email)
        }
    
        serialized(): Uint8Array {
            const constructor = PasswordSettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.email.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly email: TLString) {}
    
    } // class PasswordSettings
    } // namespace account

    export namespace account {
    export class PasswordInputSettings implements TLObject {
        static readonly cons = new TLInt(0x86916deb);
    
        static deserialized(_data: ByteStream): PasswordInputSettings | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PasswordInputSettings.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            let newSalt: TLBytes | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLBytes.deserialized(_data);
                if (!obj) return undefined;
                newSalt = obj
            }
            let newPasswordHash: TLBytes | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLBytes.deserialized(_data);
                if (!obj) return undefined;
                newPasswordHash = obj
            }
            let hint: TLString | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                hint = obj
            }
            let email: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                email = obj
            }
            return new PasswordInputSettings(
                newSalt,
                newPasswordHash,
                hint,
                email)
        }
    
        serialized(): Uint8Array {
            const constructor = PasswordInputSettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.newSalt) ? (flags | 1) : (flags & ~1);
            flags = (!this.newPasswordHash) ? (flags | 1) : (flags & ~1);
            flags = (!this.hint) ? (flags | 1) : (flags & ~1);
            flags = (!this.email) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            if (this.newSalt) data.push(this.newSalt.serialized());
            if (this.newPasswordHash) data.push(this.newPasswordHash.serialized());
            if (this.hint) data.push(this.hint.serialized());
            if (this.email) data.push(this.email.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly newSalt: TLBytes | undefined,
            readonly newPasswordHash: TLBytes | undefined,
            readonly hint: TLString | undefined,
            readonly email: TLString | undefined) {}
    
    } // class PasswordInputSettings
    } // namespace account

    export namespace auth {
    export class PasswordRecovery implements TLObject {
        static readonly cons = new TLInt(0x137948a5);
    
        static deserialized(_data: ByteStream): PasswordRecovery | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PasswordRecovery.cons)) return undefined;
            const emailPattern = TLString.deserialized(_data);
            if (!emailPattern) return undefined;
            return new PasswordRecovery(
                emailPattern)
        }
    
        serialized(): Uint8Array {
            const constructor = PasswordRecovery.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.emailPattern.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly emailPattern: TLString) {}
    
    } // class PasswordRecovery
    } // namespace auth

    export class ReceivedNotifyMessage implements TLObject {
        static readonly cons = new TLInt(0xa384b779);
    
        static deserialized(_data: ByteStream): ReceivedNotifyMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ReceivedNotifyMessage.cons)) return undefined;
            const id = TLInt.deserialized(_data);
            if (!id) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            return new ReceivedNotifyMessage(
                id,
                flags)
        }
    
        serialized(): Uint8Array {
            const constructor = ReceivedNotifyMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.flags.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly flags: TLInt) {}
    
    } // class ReceivedNotifyMessage
    

    export class ChatInviteEmpty implements TLObject {
        static readonly cons = new TLInt(0x69df3769);
    
        static deserialized(_data: ByteStream): ChatInviteEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatInviteEmpty.cons)) return undefined;
            return new ChatInviteEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = ChatInviteEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChatInviteEmpty
    

    export class ChatInviteExported implements TLObject {
        static readonly cons = new TLInt(0xfc2e05bc);
    
        static deserialized(_data: ByteStream): ChatInviteExported | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatInviteExported.cons)) return undefined;
            const link = TLString.deserialized(_data);
            if (!link) return undefined;
            return new ChatInviteExported(
                link)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatInviteExported.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.link.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly link: TLString) {}
    
    } // class ChatInviteExported
    

    export class ChatInviteAlready implements TLObject {
        static readonly cons = new TLInt(0x5a686d7c);
    
        static deserialized(_data: ByteStream): ChatInviteAlready | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatInviteAlready.cons)) return undefined;
            const chat = deserializedObject(_data) as ChatType;
            if (!chat) return undefined;
            
            return new ChatInviteAlready(
                chat)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatInviteAlready.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chat.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chat: ChatType) {}
    
    } // class ChatInviteAlready
    

    export class ChatInvite implements TLObject {
        static readonly cons = new TLInt(0xdb74f558);
    
        static deserialized(_data: ByteStream): ChatInvite | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChatInvite.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const channel = (flags.value & 1) !== 0;
            const broadcast = (flags.value & 2) !== 0;
            const isPublic = (flags.value & 4) !== 0;
            const megagroup = (flags.value & 8) !== 0;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const photo = deserializedObject(_data) as ChatPhotoType;
            if (!photo) return undefined;
            
            const participantsCount = TLInt.deserialized(_data);
            if (!participantsCount) return undefined;
            let participants: TLVector<UserType> | undefined;
            if ((flags.value & 16) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<UserType>;
                if (!obj) return undefined;
                participants = obj
            }
            return new ChatInvite(
                channel,
                broadcast,
                isPublic,
                megagroup,
                title,
                photo,
                participantsCount,
                participants)
        }
    
        serialized(): Uint8Array {
            const constructor = ChatInvite.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.channel) ? (flags | 1) : (flags & ~1);
            flags = (this.broadcast) ? (flags | 2) : (flags & ~2);
            flags = (this.isPublic) ? (flags | 4) : (flags & ~4);
            flags = (this.megagroup) ? (flags | 8) : (flags & ~8);
            flags = (!this.participants) ? (flags | 16) : (flags & ~16);
            data.push(new TLInt(flags).serialized());
            data.push(this.title.serialized());
            data.push(this.photo.serialized());
            data.push(this.participantsCount.serialized());
            if (this.participants) data.push(this.participants.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: boolean,
            readonly broadcast: boolean,
            readonly isPublic: boolean,
            readonly megagroup: boolean,
            readonly title: TLString,
            readonly photo: ChatPhotoType,
            readonly participantsCount: TLInt,
            readonly participants: TLVector<UserType> | undefined) {}
    
    } // class ChatInvite
    

    export class InputStickerSetEmpty implements TLObject {
        static readonly cons = new TLInt(0xffb62b95);
    
        static deserialized(_data: ByteStream): InputStickerSetEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputStickerSetEmpty.cons)) return undefined;
            return new InputStickerSetEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputStickerSetEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputStickerSetEmpty
    

    export class InputStickerSetID implements TLObject {
        static readonly cons = new TLInt(0x9de7a269);
    
        static deserialized(_data: ByteStream): InputStickerSetID | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputStickerSetID.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputStickerSetID(
                id,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputStickerSetID.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong) {}
    
    } // class InputStickerSetID
    

    export class InputStickerSetShortName implements TLObject {
        static readonly cons = new TLInt(0x861cc8a0);
    
        static deserialized(_data: ByteStream): InputStickerSetShortName | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputStickerSetShortName.cons)) return undefined;
            const shortName = TLString.deserialized(_data);
            if (!shortName) return undefined;
            return new InputStickerSetShortName(
                shortName)
        }
    
        serialized(): Uint8Array {
            const constructor = InputStickerSetShortName.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.shortName.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly shortName: TLString) {}
    
    } // class InputStickerSetShortName
    

    export class StickerSet implements TLObject {
        static readonly cons = new TLInt(0xcd303b41);
    
        static deserialized(_data: ByteStream): StickerSet | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(StickerSet.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const installed = (flags.value & 1) !== 0;
            const archived = (flags.value & 2) !== 0;
            const official = (flags.value & 4) !== 0;
            const masks = (flags.value & 8) !== 0;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const shortName = TLString.deserialized(_data);
            if (!shortName) return undefined;
            const count = TLInt.deserialized(_data);
            if (!count) return undefined;
            const hash = TLInt.deserialized(_data);
            if (!hash) return undefined;
            return new StickerSet(
                installed,
                archived,
                official,
                masks,
                id,
                accessHash,
                title,
                shortName,
                count,
                hash)
        }
    
        serialized(): Uint8Array {
            const constructor = StickerSet.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.installed) ? (flags | 1) : (flags & ~1);
            flags = (this.archived) ? (flags | 2) : (flags & ~2);
            flags = (this.official) ? (flags | 4) : (flags & ~4);
            flags = (this.masks) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.title.serialized());
            data.push(this.shortName.serialized());
            data.push(this.count.serialized());
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly installed: boolean,
            readonly archived: boolean,
            readonly official: boolean,
            readonly masks: boolean,
            readonly id: TLLong,
            readonly accessHash: TLLong,
            readonly title: TLString,
            readonly shortName: TLString,
            readonly count: TLInt,
            readonly hash: TLInt) {}
    
    } // class StickerSet
    

    export namespace messages {
    export class StickerSet implements TLObject {
        static readonly cons = new TLInt(0xb60a24a6);
    
        static deserialized(_data: ByteStream): StickerSet | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(StickerSet.cons)) return undefined;
            const set = deserializedObject(_data) as StickerSet;
            if (!set) return undefined;
            
            const packs = TLVector.deserialized(_data, StickerPack) as TLVector<StickerPack>;
            if (!packs) return undefined;
            const documents = TLVector.deserialized(_data, ) as TLVector<DocumentType>;
            if (!documents) return undefined;
            return new StickerSet(
                set,
                packs,
                documents)
        }
    
        serialized(): Uint8Array {
            const constructor = StickerSet.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.set.serialized());
            data.push(this.packs.serialized());
            data.push(this.documents.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly set: StickerSet,
            readonly packs: TLVector<StickerPack>,
            readonly documents: TLVector<DocumentType>) {}
    
    } // class StickerSet
    } // namespace messages

    export class BotCommand implements TLObject {
        static readonly cons = new TLInt(0xc27ac8c7);
    
        static deserialized(_data: ByteStream): BotCommand | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotCommand.cons)) return undefined;
            const command = TLString.deserialized(_data);
            if (!command) return undefined;
            const description = TLString.deserialized(_data);
            if (!description) return undefined;
            return new BotCommand(
                command,
                description)
        }
    
        serialized(): Uint8Array {
            const constructor = BotCommand.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.command.serialized());
            data.push(this.description.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly command: TLString,
            readonly description: TLString) {}
    
    } // class BotCommand
    

    export class BotInfo implements TLObject {
        static readonly cons = new TLInt(0x98e81d3a);
    
        static deserialized(_data: ByteStream): BotInfo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotInfo.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const description = TLString.deserialized(_data);
            if (!description) return undefined;
            const commands = TLVector.deserialized(_data, BotCommand) as TLVector<BotCommand>;
            if (!commands) return undefined;
            return new BotInfo(
                userId,
                description,
                commands)
        }
    
        serialized(): Uint8Array {
            const constructor = BotInfo.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.description.serialized());
            data.push(this.commands.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly description: TLString,
            readonly commands: TLVector<BotCommand>) {}
    
    } // class BotInfo
    

    export class KeyboardButton implements TLObject {
        static readonly cons = new TLInt(0xa2fa4880);
    
        static deserialized(_data: ByteStream): KeyboardButton | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(KeyboardButton.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            return new KeyboardButton(
                text)
        }
    
        serialized(): Uint8Array {
            const constructor = KeyboardButton.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString) {}
    
    } // class KeyboardButton
    

    export class KeyboardButtonUrl implements TLObject {
        static readonly cons = new TLInt(0x258aff05);
    
        static deserialized(_data: ByteStream): KeyboardButtonUrl | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(KeyboardButtonUrl.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            const url = TLString.deserialized(_data);
            if (!url) return undefined;
            return new KeyboardButtonUrl(
                text,
                url)
        }
    
        serialized(): Uint8Array {
            const constructor = KeyboardButtonUrl.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
            data.push(this.url.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString,
            readonly url: TLString) {}
    
    } // class KeyboardButtonUrl
    

    export class KeyboardButtonCallback implements TLObject {
        static readonly cons = new TLInt(0x683a5e46);
    
        static deserialized(_data: ByteStream): KeyboardButtonCallback | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(KeyboardButtonCallback.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            const data = TLBytes.deserialized(_data);
            if (!data) return undefined;
            return new KeyboardButtonCallback(
                text,
                data)
        }
    
        serialized(): Uint8Array {
            const constructor = KeyboardButtonCallback.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
            data.push(this.data.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString,
            readonly data: TLBytes) {}
    
    } // class KeyboardButtonCallback
    

    export class KeyboardButtonRequestPhone implements TLObject {
        static readonly cons = new TLInt(0xb16a6c29);
    
        static deserialized(_data: ByteStream): KeyboardButtonRequestPhone | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(KeyboardButtonRequestPhone.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            return new KeyboardButtonRequestPhone(
                text)
        }
    
        serialized(): Uint8Array {
            const constructor = KeyboardButtonRequestPhone.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString) {}
    
    } // class KeyboardButtonRequestPhone
    

    export class KeyboardButtonRequestGeoLocation implements TLObject {
        static readonly cons = new TLInt(0xfc796b3f);
    
        static deserialized(_data: ByteStream): KeyboardButtonRequestGeoLocation | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(KeyboardButtonRequestGeoLocation.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            return new KeyboardButtonRequestGeoLocation(
                text)
        }
    
        serialized(): Uint8Array {
            const constructor = KeyboardButtonRequestGeoLocation.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString) {}
    
    } // class KeyboardButtonRequestGeoLocation
    

    export class KeyboardButtonSwitchInline implements TLObject {
        static readonly cons = new TLInt(0x568a748);
    
        static deserialized(_data: ByteStream): KeyboardButtonSwitchInline | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(KeyboardButtonSwitchInline.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const samePeer = (flags.value & 1) !== 0;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            const query = TLString.deserialized(_data);
            if (!query) return undefined;
            return new KeyboardButtonSwitchInline(
                samePeer,
                text,
                query)
        }
    
        serialized(): Uint8Array {
            const constructor = KeyboardButtonSwitchInline.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.samePeer) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.text.serialized());
            data.push(this.query.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly samePeer: boolean,
            readonly text: TLString,
            readonly query: TLString) {}
    
    } // class KeyboardButtonSwitchInline
    

    export class KeyboardButtonGame implements TLObject {
        static readonly cons = new TLInt(0x50f41ccf);
    
        static deserialized(_data: ByteStream): KeyboardButtonGame | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(KeyboardButtonGame.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            return new KeyboardButtonGame(
                text)
        }
    
        serialized(): Uint8Array {
            const constructor = KeyboardButtonGame.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString) {}
    
    } // class KeyboardButtonGame
    

    export class KeyboardButtonRow implements TLObject {
        static readonly cons = new TLInt(0x77608b83);
    
        static deserialized(_data: ByteStream): KeyboardButtonRow | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(KeyboardButtonRow.cons)) return undefined;
            const buttons = TLVector.deserialized(_data, ) as TLVector<KeyboardButtonType>;
            if (!buttons) return undefined;
            return new KeyboardButtonRow(
                buttons)
        }
    
        serialized(): Uint8Array {
            const constructor = KeyboardButtonRow.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.buttons.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly buttons: TLVector<KeyboardButtonType>) {}
    
    } // class KeyboardButtonRow
    

    export class ReplyKeyboardHide implements TLObject {
        static readonly cons = new TLInt(0xa03e5b85);
    
        static deserialized(_data: ByteStream): ReplyKeyboardHide | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ReplyKeyboardHide.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const selective = (flags.value & 4) !== 0;
            return new ReplyKeyboardHide(
                selective)
        }
    
        serialized(): Uint8Array {
            const constructor = ReplyKeyboardHide.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.selective) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly selective: boolean) {}
    
    } // class ReplyKeyboardHide
    

    export class ReplyKeyboardForceReply implements TLObject {
        static readonly cons = new TLInt(0xf4108aa0);
    
        static deserialized(_data: ByteStream): ReplyKeyboardForceReply | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ReplyKeyboardForceReply.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const singleUse = (flags.value & 2) !== 0;
            const selective = (flags.value & 4) !== 0;
            return new ReplyKeyboardForceReply(
                singleUse,
                selective)
        }
    
        serialized(): Uint8Array {
            const constructor = ReplyKeyboardForceReply.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.singleUse) ? (flags | 2) : (flags & ~2);
            flags = (this.selective) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly singleUse: boolean,
            readonly selective: boolean) {}
    
    } // class ReplyKeyboardForceReply
    

    export class ReplyKeyboardMarkup implements TLObject {
        static readonly cons = new TLInt(0x3502758c);
    
        static deserialized(_data: ByteStream): ReplyKeyboardMarkup | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ReplyKeyboardMarkup.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const resize = (flags.value & 1) !== 0;
            const singleUse = (flags.value & 2) !== 0;
            const selective = (flags.value & 4) !== 0;
            const rows = TLVector.deserialized(_data, KeyboardButtonRow) as TLVector<KeyboardButtonRow>;
            if (!rows) return undefined;
            return new ReplyKeyboardMarkup(
                resize,
                singleUse,
                selective,
                rows)
        }
    
        serialized(): Uint8Array {
            const constructor = ReplyKeyboardMarkup.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.resize) ? (flags | 1) : (flags & ~1);
            flags = (this.singleUse) ? (flags | 2) : (flags & ~2);
            flags = (this.selective) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.rows.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly resize: boolean,
            readonly singleUse: boolean,
            readonly selective: boolean,
            readonly rows: TLVector<KeyboardButtonRow>) {}
    
    } // class ReplyKeyboardMarkup
    

    export class ReplyInlineMarkup implements TLObject {
        static readonly cons = new TLInt(0x48a30254);
    
        static deserialized(_data: ByteStream): ReplyInlineMarkup | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ReplyInlineMarkup.cons)) return undefined;
            const rows = TLVector.deserialized(_data, KeyboardButtonRow) as TLVector<KeyboardButtonRow>;
            if (!rows) return undefined;
            return new ReplyInlineMarkup(
                rows)
        }
    
        serialized(): Uint8Array {
            const constructor = ReplyInlineMarkup.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.rows.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly rows: TLVector<KeyboardButtonRow>) {}
    
    } // class ReplyInlineMarkup
    

    export namespace help {
    export class AppChangelogEmpty implements TLObject {
        static readonly cons = new TLInt(0xaf7e0394);
    
        static deserialized(_data: ByteStream): AppChangelogEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(AppChangelogEmpty.cons)) return undefined;
            return new AppChangelogEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = AppChangelogEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class AppChangelogEmpty
    } // namespace help

    export namespace help {
    export class AppChangelog implements TLObject {
        static readonly cons = new TLInt(0x4668e6bd);
    
        static deserialized(_data: ByteStream): AppChangelog | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(AppChangelog.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            return new AppChangelog(
                text)
        }
    
        serialized(): Uint8Array {
            const constructor = AppChangelog.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString) {}
    
    } // class AppChangelog
    } // namespace help

    export class MessageEntityUnknown implements TLObject {
        static readonly cons = new TLInt(0xbb92ba95);
    
        static deserialized(_data: ByteStream): MessageEntityUnknown | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityUnknown.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new MessageEntityUnknown(
                offset,
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityUnknown.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt) {}
    
    } // class MessageEntityUnknown
    

    export class MessageEntityMention implements TLObject {
        static readonly cons = new TLInt(0xfa04579d);
    
        static deserialized(_data: ByteStream): MessageEntityMention | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityMention.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new MessageEntityMention(
                offset,
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityMention.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt) {}
    
    } // class MessageEntityMention
    

    export class MessageEntityHashtag implements TLObject {
        static readonly cons = new TLInt(0x6f635b0d);
    
        static deserialized(_data: ByteStream): MessageEntityHashtag | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityHashtag.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new MessageEntityHashtag(
                offset,
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityHashtag.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt) {}
    
    } // class MessageEntityHashtag
    

    export class MessageEntityBotCommand implements TLObject {
        static readonly cons = new TLInt(0x6cef8ac7);
    
        static deserialized(_data: ByteStream): MessageEntityBotCommand | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityBotCommand.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new MessageEntityBotCommand(
                offset,
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityBotCommand.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt) {}
    
    } // class MessageEntityBotCommand
    

    export class MessageEntityUrl implements TLObject {
        static readonly cons = new TLInt(0x6ed02538);
    
        static deserialized(_data: ByteStream): MessageEntityUrl | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityUrl.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new MessageEntityUrl(
                offset,
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityUrl.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt) {}
    
    } // class MessageEntityUrl
    

    export class MessageEntityEmail implements TLObject {
        static readonly cons = new TLInt(0x64e475c2);
    
        static deserialized(_data: ByteStream): MessageEntityEmail | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityEmail.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new MessageEntityEmail(
                offset,
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityEmail.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt) {}
    
    } // class MessageEntityEmail
    

    export class MessageEntityBold implements TLObject {
        static readonly cons = new TLInt(0xbd610bc9);
    
        static deserialized(_data: ByteStream): MessageEntityBold | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityBold.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new MessageEntityBold(
                offset,
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityBold.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt) {}
    
    } // class MessageEntityBold
    

    export class MessageEntityItalic implements TLObject {
        static readonly cons = new TLInt(0x826f8b60);
    
        static deserialized(_data: ByteStream): MessageEntityItalic | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityItalic.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new MessageEntityItalic(
                offset,
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityItalic.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt) {}
    
    } // class MessageEntityItalic
    

    export class MessageEntityCode implements TLObject {
        static readonly cons = new TLInt(0x28a20571);
    
        static deserialized(_data: ByteStream): MessageEntityCode | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityCode.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new MessageEntityCode(
                offset,
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityCode.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt) {}
    
    } // class MessageEntityCode
    

    export class MessageEntityPre implements TLObject {
        static readonly cons = new TLInt(0x73924be0);
    
        static deserialized(_data: ByteStream): MessageEntityPre | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityPre.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            const language = TLString.deserialized(_data);
            if (!language) return undefined;
            return new MessageEntityPre(
                offset,
                length,
                language)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityPre.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
            data.push(this.language.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt,
            readonly language: TLString) {}
    
    } // class MessageEntityPre
    

    export class MessageEntityTextUrl implements TLObject {
        static readonly cons = new TLInt(0x76a6d327);
    
        static deserialized(_data: ByteStream): MessageEntityTextUrl | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityTextUrl.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            const url = TLString.deserialized(_data);
            if (!url) return undefined;
            return new MessageEntityTextUrl(
                offset,
                length,
                url)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityTextUrl.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
            data.push(this.url.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt,
            readonly url: TLString) {}
    
    } // class MessageEntityTextUrl
    

    export class MessageEntityMentionName implements TLObject {
        static readonly cons = new TLInt(0x352dca58);
    
        static deserialized(_data: ByteStream): MessageEntityMentionName | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEntityMentionName.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            return new MessageEntityMentionName(
                offset,
                length,
                userId)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEntityMentionName.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt,
            readonly userId: TLInt) {}
    
    } // class MessageEntityMentionName
    

    export class InputMessageEntityMentionName implements TLObject {
        static readonly cons = new TLInt(0x208e68c9);
    
        static deserialized(_data: ByteStream): InputMessageEntityMentionName | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputMessageEntityMentionName.cons)) return undefined;
            const offset = TLInt.deserialized(_data);
            if (!offset) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            const userId = deserializedObject(_data) as InputUserType;
            if (!userId) return undefined;
            
            return new InputMessageEntityMentionName(
                offset,
                length,
                userId)
        }
    
        serialized(): Uint8Array {
            const constructor = InputMessageEntityMentionName.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.length.serialized());
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly length: TLInt,
            readonly userId: InputUserType) {}
    
    } // class InputMessageEntityMentionName
    

    export class InputChannelEmpty implements TLObject {
        static readonly cons = new TLInt(0xee8c1e86);
    
        static deserialized(_data: ByteStream): InputChannelEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputChannelEmpty.cons)) return undefined;
            return new InputChannelEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = InputChannelEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class InputChannelEmpty
    

    export class InputChannel implements TLObject {
        static readonly cons = new TLInt(0xafeb712e);
    
        static deserialized(_data: ByteStream): InputChannel | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputChannel.cons)) return undefined;
            const channelId = TLInt.deserialized(_data);
            if (!channelId) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputChannel(
                channelId,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channelId.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channelId: TLInt,
            readonly accessHash: TLLong) {}
    
    } // class InputChannel
    

    export namespace contacts {
    export class ResolvedPeer implements TLObject {
        static readonly cons = new TLInt(0x7f077ad9);
    
        static deserialized(_data: ByteStream): ResolvedPeer | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ResolvedPeer.cons)) return undefined;
            const peer = deserializedObject(_data) as PeerType;
            if (!peer) return undefined;
            
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new ResolvedPeer(
                peer,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = ResolvedPeer.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: PeerType,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class ResolvedPeer
    } // namespace contacts

    export class MessageRange implements TLObject {
        static readonly cons = new TLInt(0xae30253);
    
        static deserialized(_data: ByteStream): MessageRange | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageRange.cons)) return undefined;
            const minId = TLInt.deserialized(_data);
            if (!minId) return undefined;
            const maxId = TLInt.deserialized(_data);
            if (!maxId) return undefined;
            return new MessageRange(
                minId,
                maxId)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageRange.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.minId.serialized());
            data.push(this.maxId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly minId: TLInt,
            readonly maxId: TLInt) {}
    
    } // class MessageRange
    

    export namespace updates {
    export class ChannelDifferenceEmpty implements TLObject {
        static readonly cons = new TLInt(0x3e11affb);
    
        static deserialized(_data: ByteStream): ChannelDifferenceEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelDifferenceEmpty.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const final = (flags.value & 1) !== 0;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            let timeout: TLInt | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                timeout = obj
            }
            return new ChannelDifferenceEmpty(
                final,
                pts,
                timeout)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelDifferenceEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.final) ? (flags | 1) : (flags & ~1);
            flags = (!this.timeout) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.pts.serialized());
            if (this.timeout) data.push(this.timeout.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly final: boolean,
            readonly pts: TLInt,
            readonly timeout: TLInt | undefined) {}
    
    } // class ChannelDifferenceEmpty
    } // namespace updates

    export namespace updates {
    export class ChannelDifferenceTooLong implements TLObject {
        static readonly cons = new TLInt(0x410dee07);
    
        static deserialized(_data: ByteStream): ChannelDifferenceTooLong | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelDifferenceTooLong.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const final = (flags.value & 1) !== 0;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            let timeout: TLInt | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                timeout = obj
            }
            const topMessage = TLInt.deserialized(_data);
            if (!topMessage) return undefined;
            const readInboxMaxId = TLInt.deserialized(_data);
            if (!readInboxMaxId) return undefined;
            const readOutboxMaxId = TLInt.deserialized(_data);
            if (!readOutboxMaxId) return undefined;
            const unreadCount = TLInt.deserialized(_data);
            if (!unreadCount) return undefined;
            const messages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!messages) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new ChannelDifferenceTooLong(
                final,
                pts,
                timeout,
                topMessage,
                readInboxMaxId,
                readOutboxMaxId,
                unreadCount,
                messages,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelDifferenceTooLong.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.final) ? (flags | 1) : (flags & ~1);
            flags = (!this.timeout) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.pts.serialized());
            if (this.timeout) data.push(this.timeout.serialized());
            data.push(this.topMessage.serialized());
            data.push(this.readInboxMaxId.serialized());
            data.push(this.readOutboxMaxId.serialized());
            data.push(this.unreadCount.serialized());
            data.push(this.messages.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly final: boolean,
            readonly pts: TLInt,
            readonly timeout: TLInt | undefined,
            readonly topMessage: TLInt,
            readonly readInboxMaxId: TLInt,
            readonly readOutboxMaxId: TLInt,
            readonly unreadCount: TLInt,
            readonly messages: TLVector<MessageType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class ChannelDifferenceTooLong
    } // namespace updates

    export namespace updates {
    export class ChannelDifference implements TLObject {
        static readonly cons = new TLInt(0x2064674e);
    
        static deserialized(_data: ByteStream): ChannelDifference | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelDifference.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const final = (flags.value & 1) !== 0;
            const pts = TLInt.deserialized(_data);
            if (!pts) return undefined;
            let timeout: TLInt | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                timeout = obj
            }
            const newMessages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!newMessages) return undefined;
            const otherUpdates = TLVector.deserialized(_data, ) as TLVector<UpdateType>;
            if (!otherUpdates) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new ChannelDifference(
                final,
                pts,
                timeout,
                newMessages,
                otherUpdates,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelDifference.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.final) ? (flags | 1) : (flags & ~1);
            flags = (!this.timeout) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.pts.serialized());
            if (this.timeout) data.push(this.timeout.serialized());
            data.push(this.newMessages.serialized());
            data.push(this.otherUpdates.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly final: boolean,
            readonly pts: TLInt,
            readonly timeout: TLInt | undefined,
            readonly newMessages: TLVector<MessageType>,
            readonly otherUpdates: TLVector<UpdateType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class ChannelDifference
    } // namespace updates

    export class ChannelMessagesFilterEmpty implements TLObject {
        static readonly cons = new TLInt(0x94d42ee7);
    
        static deserialized(_data: ByteStream): ChannelMessagesFilterEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelMessagesFilterEmpty.cons)) return undefined;
            return new ChannelMessagesFilterEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelMessagesFilterEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChannelMessagesFilterEmpty
    

    export class ChannelMessagesFilter implements TLObject {
        static readonly cons = new TLInt(0xcd77d957);
    
        static deserialized(_data: ByteStream): ChannelMessagesFilter | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelMessagesFilter.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const excludeNewMessages = (flags.value & 2) !== 0;
            const ranges = TLVector.deserialized(_data, MessageRange) as TLVector<MessageRange>;
            if (!ranges) return undefined;
            return new ChannelMessagesFilter(
                excludeNewMessages,
                ranges)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelMessagesFilter.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.excludeNewMessages) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.ranges.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly excludeNewMessages: boolean,
            readonly ranges: TLVector<MessageRange>) {}
    
    } // class ChannelMessagesFilter
    

    export class ChannelParticipant implements TLObject {
        static readonly cons = new TLInt(0x15ebac1d);
    
        static deserialized(_data: ByteStream): ChannelParticipant | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipant.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new ChannelParticipant(
                userId,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipant.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly date: TLInt) {}
    
    } // class ChannelParticipant
    

    export class ChannelParticipantSelf implements TLObject {
        static readonly cons = new TLInt(0xa3289a6d);
    
        static deserialized(_data: ByteStream): ChannelParticipantSelf | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipantSelf.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const inviterId = TLInt.deserialized(_data);
            if (!inviterId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new ChannelParticipantSelf(
                userId,
                inviterId,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipantSelf.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.inviterId.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly inviterId: TLInt,
            readonly date: TLInt) {}
    
    } // class ChannelParticipantSelf
    

    export class ChannelParticipantModerator implements TLObject {
        static readonly cons = new TLInt(0x91057fef);
    
        static deserialized(_data: ByteStream): ChannelParticipantModerator | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipantModerator.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const inviterId = TLInt.deserialized(_data);
            if (!inviterId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new ChannelParticipantModerator(
                userId,
                inviterId,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipantModerator.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.inviterId.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly inviterId: TLInt,
            readonly date: TLInt) {}
    
    } // class ChannelParticipantModerator
    

    export class ChannelParticipantEditor implements TLObject {
        static readonly cons = new TLInt(0x98192d61);
    
        static deserialized(_data: ByteStream): ChannelParticipantEditor | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipantEditor.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const inviterId = TLInt.deserialized(_data);
            if (!inviterId) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new ChannelParticipantEditor(
                userId,
                inviterId,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipantEditor.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.inviterId.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly inviterId: TLInt,
            readonly date: TLInt) {}
    
    } // class ChannelParticipantEditor
    

    export class ChannelParticipantKicked implements TLObject {
        static readonly cons = new TLInt(0x8cc5e69a);
    
        static deserialized(_data: ByteStream): ChannelParticipantKicked | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipantKicked.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const kickedBy = TLInt.deserialized(_data);
            if (!kickedBy) return undefined;
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new ChannelParticipantKicked(
                userId,
                kickedBy,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipantKicked.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.kickedBy.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt,
            readonly kickedBy: TLInt,
            readonly date: TLInt) {}
    
    } // class ChannelParticipantKicked
    

    export class ChannelParticipantCreator implements TLObject {
        static readonly cons = new TLInt(0xe3e2e1f9);
    
        static deserialized(_data: ByteStream): ChannelParticipantCreator | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipantCreator.cons)) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            return new ChannelParticipantCreator(
                userId)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipantCreator.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: TLInt) {}
    
    } // class ChannelParticipantCreator
    

    export class ChannelParticipantsRecent implements TLObject {
        static readonly cons = new TLInt(0xde3f3c79);
    
        static deserialized(_data: ByteStream): ChannelParticipantsRecent | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipantsRecent.cons)) return undefined;
            return new ChannelParticipantsRecent()
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipantsRecent.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChannelParticipantsRecent
    

    export class ChannelParticipantsAdmins implements TLObject {
        static readonly cons = new TLInt(0xb4608969);
    
        static deserialized(_data: ByteStream): ChannelParticipantsAdmins | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipantsAdmins.cons)) return undefined;
            return new ChannelParticipantsAdmins()
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipantsAdmins.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChannelParticipantsAdmins
    

    export class ChannelParticipantsKicked implements TLObject {
        static readonly cons = new TLInt(0x3c37bb7a);
    
        static deserialized(_data: ByteStream): ChannelParticipantsKicked | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipantsKicked.cons)) return undefined;
            return new ChannelParticipantsKicked()
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipantsKicked.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChannelParticipantsKicked
    

    export class ChannelParticipantsBots implements TLObject {
        static readonly cons = new TLInt(0xb0d1865b);
    
        static deserialized(_data: ByteStream): ChannelParticipantsBots | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipantsBots.cons)) return undefined;
            return new ChannelParticipantsBots()
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipantsBots.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChannelParticipantsBots
    

    export class ChannelRoleEmpty implements TLObject {
        static readonly cons = new TLInt(0xb285a0c6);
    
        static deserialized(_data: ByteStream): ChannelRoleEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelRoleEmpty.cons)) return undefined;
            return new ChannelRoleEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelRoleEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChannelRoleEmpty
    

    export class ChannelRoleModerator implements TLObject {
        static readonly cons = new TLInt(0x9618d975);
    
        static deserialized(_data: ByteStream): ChannelRoleModerator | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelRoleModerator.cons)) return undefined;
            return new ChannelRoleModerator()
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelRoleModerator.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChannelRoleModerator
    

    export class ChannelRoleEditor implements TLObject {
        static readonly cons = new TLInt(0x820bfe8c);
    
        static deserialized(_data: ByteStream): ChannelRoleEditor | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelRoleEditor.cons)) return undefined;
            return new ChannelRoleEditor()
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelRoleEditor.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ChannelRoleEditor
    

    export namespace channels {
    export class ChannelParticipants implements TLObject {
        static readonly cons = new TLInt(0xf56ee2a8);
    
        static deserialized(_data: ByteStream): ChannelParticipants | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipants.cons)) return undefined;
            const count = TLInt.deserialized(_data);
            if (!count) return undefined;
            const participants = TLVector.deserialized(_data, ) as TLVector<ChannelParticipantType>;
            if (!participants) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new ChannelParticipants(
                count,
                participants,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipants.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.count.serialized());
            data.push(this.participants.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly count: TLInt,
            readonly participants: TLVector<ChannelParticipantType>,
            readonly users: TLVector<UserType>) {}
    
    } // class ChannelParticipants
    } // namespace channels

    export namespace channels {
    export class ChannelParticipant implements TLObject {
        static readonly cons = new TLInt(0xd0d9b163);
    
        static deserialized(_data: ByteStream): ChannelParticipant | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ChannelParticipant.cons)) return undefined;
            const participant = deserializedObject(_data) as ChannelParticipantType;
            if (!participant) return undefined;
            
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new ChannelParticipant(
                participant,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = ChannelParticipant.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.participant.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly participant: ChannelParticipantType,
            readonly users: TLVector<UserType>) {}
    
    } // class ChannelParticipant
    } // namespace channels

    export namespace help {
    export class TermsOfService implements TLObject {
        static readonly cons = new TLInt(0xf1ee3e90);
    
        static deserialized(_data: ByteStream): TermsOfService | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TermsOfService.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            return new TermsOfService(
                text)
        }
    
        serialized(): Uint8Array {
            const constructor = TermsOfService.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString) {}
    
    } // class TermsOfService
    } // namespace help

    export class FoundGif implements TLObject {
        static readonly cons = new TLInt(0x162ecc1f);
    
        static deserialized(_data: ByteStream): FoundGif | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FoundGif.cons)) return undefined;
            const url = TLString.deserialized(_data);
            if (!url) return undefined;
            const thumbUrl = TLString.deserialized(_data);
            if (!thumbUrl) return undefined;
            const contentUrl = TLString.deserialized(_data);
            if (!contentUrl) return undefined;
            const contentType = TLString.deserialized(_data);
            if (!contentType) return undefined;
            const w = TLInt.deserialized(_data);
            if (!w) return undefined;
            const h = TLInt.deserialized(_data);
            if (!h) return undefined;
            return new FoundGif(
                url,
                thumbUrl,
                contentUrl,
                contentType,
                w,
                h)
        }
    
        serialized(): Uint8Array {
            const constructor = FoundGif.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.url.serialized());
            data.push(this.thumbUrl.serialized());
            data.push(this.contentUrl.serialized());
            data.push(this.contentType.serialized());
            data.push(this.w.serialized());
            data.push(this.h.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly url: TLString,
            readonly thumbUrl: TLString,
            readonly contentUrl: TLString,
            readonly contentType: TLString,
            readonly w: TLInt,
            readonly h: TLInt) {}
    
    } // class FoundGif
    

    export class FoundGifCached implements TLObject {
        static readonly cons = new TLInt(0x9c750409);
    
        static deserialized(_data: ByteStream): FoundGifCached | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FoundGifCached.cons)) return undefined;
            const url = TLString.deserialized(_data);
            if (!url) return undefined;
            const photo = deserializedObject(_data) as PhotoType;
            if (!photo) return undefined;
            
            const document = deserializedObject(_data) as DocumentType;
            if (!document) return undefined;
            
            return new FoundGifCached(
                url,
                photo,
                document)
        }
    
        serialized(): Uint8Array {
            const constructor = FoundGifCached.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.url.serialized());
            data.push(this.photo.serialized());
            data.push(this.document.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly url: TLString,
            readonly photo: PhotoType,
            readonly document: DocumentType) {}
    
    } // class FoundGifCached
    

    export namespace messages {
    export class FoundGifs implements TLObject {
        static readonly cons = new TLInt(0x450a1c0a);
    
        static deserialized(_data: ByteStream): FoundGifs | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FoundGifs.cons)) return undefined;
            const nextOffset = TLInt.deserialized(_data);
            if (!nextOffset) return undefined;
            const results = TLVector.deserialized(_data, ) as TLVector<FoundGifType>;
            if (!results) return undefined;
            return new FoundGifs(
                nextOffset,
                results)
        }
    
        serialized(): Uint8Array {
            const constructor = FoundGifs.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.nextOffset.serialized());
            data.push(this.results.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly nextOffset: TLInt,
            readonly results: TLVector<FoundGifType>) {}
    
    } // class FoundGifs
    } // namespace messages

    export namespace messages {
    export class SavedGifsNotModified implements TLObject {
        static readonly cons = new TLInt(0xe8025ca2);
    
        static deserialized(_data: ByteStream): SavedGifsNotModified | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SavedGifsNotModified.cons)) return undefined;
            return new SavedGifsNotModified()
        }
    
        serialized(): Uint8Array {
            const constructor = SavedGifsNotModified.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class SavedGifsNotModified
    } // namespace messages

    export namespace messages {
    export class SavedGifs implements TLObject {
        static readonly cons = new TLInt(0x2e0709a5);
    
        static deserialized(_data: ByteStream): SavedGifs | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SavedGifs.cons)) return undefined;
            const hash = TLInt.deserialized(_data);
            if (!hash) return undefined;
            const gifs = TLVector.deserialized(_data, ) as TLVector<DocumentType>;
            if (!gifs) return undefined;
            return new SavedGifs(
                hash,
                gifs)
        }
    
        serialized(): Uint8Array {
            const constructor = SavedGifs.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
            data.push(this.gifs.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLInt,
            readonly gifs: TLVector<DocumentType>) {}
    
    } // class SavedGifs
    } // namespace messages

    export class InputBotInlineMessageMediaAuto implements TLObject {
        static readonly cons = new TLInt(0x292fed13);
    
        static deserialized(_data: ByteStream): InputBotInlineMessageMediaAuto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineMessageMediaAuto.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new InputBotInlineMessageMediaAuto(
                caption,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineMessageMediaAuto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.caption.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly caption: TLString,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class InputBotInlineMessageMediaAuto
    

    export class InputBotInlineMessageText implements TLObject {
        static readonly cons = new TLInt(0x3dcd7a87);
    
        static deserialized(_data: ByteStream): InputBotInlineMessageText | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineMessageText.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const noWebpage = (flags.value & 1) !== 0;
            const message = TLString.deserialized(_data);
            if (!message) return undefined;
            let entities: TLVector<MessageEntityType> | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<MessageEntityType>;
                if (!obj) return undefined;
                entities = obj
            }
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new InputBotInlineMessageText(
                noWebpage,
                message,
                entities,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineMessageText.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.noWebpage) ? (flags | 1) : (flags & ~1);
            flags = (!this.entities) ? (flags | 2) : (flags & ~2);
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.message.serialized());
            if (this.entities) data.push(this.entities.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly noWebpage: boolean,
            readonly message: TLString,
            readonly entities: TLVector<MessageEntityType> | undefined,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class InputBotInlineMessageText
    

    export class InputBotInlineMessageMediaGeo implements TLObject {
        static readonly cons = new TLInt(0xf4a59de1);
    
        static deserialized(_data: ByteStream): InputBotInlineMessageMediaGeo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineMessageMediaGeo.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const geoPoint = deserializedObject(_data) as InputGeoPointType;
            if (!geoPoint) return undefined;
            
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new InputBotInlineMessageMediaGeo(
                geoPoint,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineMessageMediaGeo.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.geoPoint.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly geoPoint: InputGeoPointType,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class InputBotInlineMessageMediaGeo
    

    export class InputBotInlineMessageMediaVenue implements TLObject {
        static readonly cons = new TLInt(0xaaafadc8);
    
        static deserialized(_data: ByteStream): InputBotInlineMessageMediaVenue | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineMessageMediaVenue.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const geoPoint = deserializedObject(_data) as InputGeoPointType;
            if (!geoPoint) return undefined;
            
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const address = TLString.deserialized(_data);
            if (!address) return undefined;
            const provider = TLString.deserialized(_data);
            if (!provider) return undefined;
            const venueId = TLString.deserialized(_data);
            if (!venueId) return undefined;
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new InputBotInlineMessageMediaVenue(
                geoPoint,
                title,
                address,
                provider,
                venueId,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineMessageMediaVenue.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.geoPoint.serialized());
            data.push(this.title.serialized());
            data.push(this.address.serialized());
            data.push(this.provider.serialized());
            data.push(this.venueId.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly geoPoint: InputGeoPointType,
            readonly title: TLString,
            readonly address: TLString,
            readonly provider: TLString,
            readonly venueId: TLString,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class InputBotInlineMessageMediaVenue
    

    export class InputBotInlineMessageMediaContact implements TLObject {
        static readonly cons = new TLInt(0x2daf01a7);
    
        static deserialized(_data: ByteStream): InputBotInlineMessageMediaContact | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineMessageMediaContact.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const phoneNumber = TLString.deserialized(_data);
            if (!phoneNumber) return undefined;
            const firstName = TLString.deserialized(_data);
            if (!firstName) return undefined;
            const lastName = TLString.deserialized(_data);
            if (!lastName) return undefined;
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new InputBotInlineMessageMediaContact(
                phoneNumber,
                firstName,
                lastName,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineMessageMediaContact.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.phoneNumber.serialized());
            data.push(this.firstName.serialized());
            data.push(this.lastName.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly firstName: TLString,
            readonly lastName: TLString,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class InputBotInlineMessageMediaContact
    

    export class InputBotInlineMessageGame implements TLObject {
        static readonly cons = new TLInt(0x4b425864);
    
        static deserialized(_data: ByteStream): InputBotInlineMessageGame | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineMessageGame.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new InputBotInlineMessageGame(
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineMessageGame.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class InputBotInlineMessageGame
    

    export class InputBotInlineResult implements TLObject {
        static readonly cons = new TLInt(0x2cbbe15a);
    
        static deserialized(_data: ByteStream): InputBotInlineResult | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineResult.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const id = TLString.deserialized(_data);
            if (!id) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            let title: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                title = obj
            }
            let description: TLString | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                description = obj
            }
            let url: TLString | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                url = obj
            }
            let thumbUrl: TLString | undefined;
            if ((flags.value & 16) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                thumbUrl = obj
            }
            let contentUrl: TLString | undefined;
            if ((flags.value & 32) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                contentUrl = obj
            }
            let contentType: TLString | undefined;
            if ((flags.value & 32) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                contentType = obj
            }
            let w: TLInt | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                w = obj
            }
            let h: TLInt | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                h = obj
            }
            let duration: TLInt | undefined;
            if ((flags.value & 128) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                duration = obj
            }
            const sendMessage = deserializedObject(_data) as InputBotInlineMessageType;
            if (!sendMessage) return undefined;
            
            return new InputBotInlineResult(
                id,
                type,
                title,
                description,
                url,
                thumbUrl,
                contentUrl,
                contentType,
                w,
                h,
                duration,
                sendMessage)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineResult.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.title) ? (flags | 2) : (flags & ~2);
            flags = (!this.description) ? (flags | 4) : (flags & ~4);
            flags = (!this.url) ? (flags | 8) : (flags & ~8);
            flags = (!this.thumbUrl) ? (flags | 16) : (flags & ~16);
            flags = (!this.contentUrl) ? (flags | 32) : (flags & ~32);
            flags = (!this.contentType) ? (flags | 32) : (flags & ~32);
            flags = (!this.w) ? (flags | 64) : (flags & ~64);
            flags = (!this.h) ? (flags | 64) : (flags & ~64);
            flags = (!this.duration) ? (flags | 128) : (flags & ~128);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.type.serialized());
            if (this.title) data.push(this.title.serialized());
            if (this.description) data.push(this.description.serialized());
            if (this.url) data.push(this.url.serialized());
            if (this.thumbUrl) data.push(this.thumbUrl.serialized());
            if (this.contentUrl) data.push(this.contentUrl.serialized());
            if (this.contentType) data.push(this.contentType.serialized());
            if (this.w) data.push(this.w.serialized());
            if (this.h) data.push(this.h.serialized());
            if (this.duration) data.push(this.duration.serialized());
            data.push(this.sendMessage.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLString,
            readonly type: TLString,
            readonly title: TLString | undefined,
            readonly description: TLString | undefined,
            readonly url: TLString | undefined,
            readonly thumbUrl: TLString | undefined,
            readonly contentUrl: TLString | undefined,
            readonly contentType: TLString | undefined,
            readonly w: TLInt | undefined,
            readonly h: TLInt | undefined,
            readonly duration: TLInt | undefined,
            readonly sendMessage: InputBotInlineMessageType) {}
    
    } // class InputBotInlineResult
    

    export class InputBotInlineResultPhoto implements TLObject {
        static readonly cons = new TLInt(0xa8d864a7);
    
        static deserialized(_data: ByteStream): InputBotInlineResultPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineResultPhoto.cons)) return undefined;
            const id = TLString.deserialized(_data);
            if (!id) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            const photo = deserializedObject(_data) as InputPhotoType;
            if (!photo) return undefined;
            
            const sendMessage = deserializedObject(_data) as InputBotInlineMessageType;
            if (!sendMessage) return undefined;
            
            return new InputBotInlineResultPhoto(
                id,
                type,
                photo,
                sendMessage)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineResultPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.type.serialized());
            data.push(this.photo.serialized());
            data.push(this.sendMessage.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLString,
            readonly type: TLString,
            readonly photo: InputPhotoType,
            readonly sendMessage: InputBotInlineMessageType) {}
    
    } // class InputBotInlineResultPhoto
    

    export class InputBotInlineResultDocument implements TLObject {
        static readonly cons = new TLInt(0xfff8fdc4);
    
        static deserialized(_data: ByteStream): InputBotInlineResultDocument | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineResultDocument.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const id = TLString.deserialized(_data);
            if (!id) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            let title: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                title = obj
            }
            let description: TLString | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                description = obj
            }
            const document = deserializedObject(_data) as InputDocumentType;
            if (!document) return undefined;
            
            const sendMessage = deserializedObject(_data) as InputBotInlineMessageType;
            if (!sendMessage) return undefined;
            
            return new InputBotInlineResultDocument(
                id,
                type,
                title,
                description,
                document,
                sendMessage)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineResultDocument.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.title) ? (flags | 2) : (flags & ~2);
            flags = (!this.description) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.type.serialized());
            if (this.title) data.push(this.title.serialized());
            if (this.description) data.push(this.description.serialized());
            data.push(this.document.serialized());
            data.push(this.sendMessage.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLString,
            readonly type: TLString,
            readonly title: TLString | undefined,
            readonly description: TLString | undefined,
            readonly document: InputDocumentType,
            readonly sendMessage: InputBotInlineMessageType) {}
    
    } // class InputBotInlineResultDocument
    

    export class InputBotInlineResultGame implements TLObject {
        static readonly cons = new TLInt(0x4fa417f2);
    
        static deserialized(_data: ByteStream): InputBotInlineResultGame | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineResultGame.cons)) return undefined;
            const id = TLString.deserialized(_data);
            if (!id) return undefined;
            const shortName = TLString.deserialized(_data);
            if (!shortName) return undefined;
            const sendMessage = deserializedObject(_data) as InputBotInlineMessageType;
            if (!sendMessage) return undefined;
            
            return new InputBotInlineResultGame(
                id,
                shortName,
                sendMessage)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineResultGame.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.shortName.serialized());
            data.push(this.sendMessage.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLString,
            readonly shortName: TLString,
            readonly sendMessage: InputBotInlineMessageType) {}
    
    } // class InputBotInlineResultGame
    

    export class BotInlineMessageMediaAuto implements TLObject {
        static readonly cons = new TLInt(0xa74b15b);
    
        static deserialized(_data: ByteStream): BotInlineMessageMediaAuto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotInlineMessageMediaAuto.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const caption = TLString.deserialized(_data);
            if (!caption) return undefined;
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new BotInlineMessageMediaAuto(
                caption,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = BotInlineMessageMediaAuto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.caption.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly caption: TLString,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class BotInlineMessageMediaAuto
    

    export class BotInlineMessageText implements TLObject {
        static readonly cons = new TLInt(0x8c7f65e2);
    
        static deserialized(_data: ByteStream): BotInlineMessageText | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotInlineMessageText.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const noWebpage = (flags.value & 1) !== 0;
            const message = TLString.deserialized(_data);
            if (!message) return undefined;
            let entities: TLVector<MessageEntityType> | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<MessageEntityType>;
                if (!obj) return undefined;
                entities = obj
            }
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new BotInlineMessageText(
                noWebpage,
                message,
                entities,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = BotInlineMessageText.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.noWebpage) ? (flags | 1) : (flags & ~1);
            flags = (!this.entities) ? (flags | 2) : (flags & ~2);
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.message.serialized());
            if (this.entities) data.push(this.entities.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly noWebpage: boolean,
            readonly message: TLString,
            readonly entities: TLVector<MessageEntityType> | undefined,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class BotInlineMessageText
    

    export class BotInlineMessageMediaGeo implements TLObject {
        static readonly cons = new TLInt(0x3a8fd8b8);
    
        static deserialized(_data: ByteStream): BotInlineMessageMediaGeo | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotInlineMessageMediaGeo.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const geo = deserializedObject(_data) as GeoPointType;
            if (!geo) return undefined;
            
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new BotInlineMessageMediaGeo(
                geo,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = BotInlineMessageMediaGeo.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.geo.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly geo: GeoPointType,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class BotInlineMessageMediaGeo
    

    export class BotInlineMessageMediaVenue implements TLObject {
        static readonly cons = new TLInt(0x4366232e);
    
        static deserialized(_data: ByteStream): BotInlineMessageMediaVenue | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotInlineMessageMediaVenue.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const geo = deserializedObject(_data) as GeoPointType;
            if (!geo) return undefined;
            
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const address = TLString.deserialized(_data);
            if (!address) return undefined;
            const provider = TLString.deserialized(_data);
            if (!provider) return undefined;
            const venueId = TLString.deserialized(_data);
            if (!venueId) return undefined;
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new BotInlineMessageMediaVenue(
                geo,
                title,
                address,
                provider,
                venueId,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = BotInlineMessageMediaVenue.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.geo.serialized());
            data.push(this.title.serialized());
            data.push(this.address.serialized());
            data.push(this.provider.serialized());
            data.push(this.venueId.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly geo: GeoPointType,
            readonly title: TLString,
            readonly address: TLString,
            readonly provider: TLString,
            readonly venueId: TLString,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class BotInlineMessageMediaVenue
    

    export class BotInlineMessageMediaContact implements TLObject {
        static readonly cons = new TLInt(0x35edb4d4);
    
        static deserialized(_data: ByteStream): BotInlineMessageMediaContact | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotInlineMessageMediaContact.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const phoneNumber = TLString.deserialized(_data);
            if (!phoneNumber) return undefined;
            const firstName = TLString.deserialized(_data);
            if (!firstName) return undefined;
            const lastName = TLString.deserialized(_data);
            if (!lastName) return undefined;
            let replyMarkup: ReplyMarkupType | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as ReplyMarkupType;
                if (!obj) return undefined;
                replyMarkup = obj
            }
            return new BotInlineMessageMediaContact(
                phoneNumber,
                firstName,
                lastName,
                replyMarkup)
        }
    
        serialized(): Uint8Array {
            const constructor = BotInlineMessageMediaContact.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.phoneNumber.serialized());
            data.push(this.firstName.serialized());
            data.push(this.lastName.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly firstName: TLString,
            readonly lastName: TLString,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class BotInlineMessageMediaContact
    

    export class BotInlineResult implements TLObject {
        static readonly cons = new TLInt(0x9bebaeb9);
    
        static deserialized(_data: ByteStream): BotInlineResult | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotInlineResult.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const id = TLString.deserialized(_data);
            if (!id) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            let title: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                title = obj
            }
            let description: TLString | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                description = obj
            }
            let url: TLString | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                url = obj
            }
            let thumbUrl: TLString | undefined;
            if ((flags.value & 16) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                thumbUrl = obj
            }
            let contentUrl: TLString | undefined;
            if ((flags.value & 32) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                contentUrl = obj
            }
            let contentType: TLString | undefined;
            if ((flags.value & 32) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                contentType = obj
            }
            let w: TLInt | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                w = obj
            }
            let h: TLInt | undefined;
            if ((flags.value & 64) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                h = obj
            }
            let duration: TLInt | undefined;
            if ((flags.value & 128) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                duration = obj
            }
            const sendMessage = deserializedObject(_data) as BotInlineMessageType;
            if (!sendMessage) return undefined;
            
            return new BotInlineResult(
                id,
                type,
                title,
                description,
                url,
                thumbUrl,
                contentUrl,
                contentType,
                w,
                h,
                duration,
                sendMessage)
        }
    
        serialized(): Uint8Array {
            const constructor = BotInlineResult.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.title) ? (flags | 2) : (flags & ~2);
            flags = (!this.description) ? (flags | 4) : (flags & ~4);
            flags = (!this.url) ? (flags | 8) : (flags & ~8);
            flags = (!this.thumbUrl) ? (flags | 16) : (flags & ~16);
            flags = (!this.contentUrl) ? (flags | 32) : (flags & ~32);
            flags = (!this.contentType) ? (flags | 32) : (flags & ~32);
            flags = (!this.w) ? (flags | 64) : (flags & ~64);
            flags = (!this.h) ? (flags | 64) : (flags & ~64);
            flags = (!this.duration) ? (flags | 128) : (flags & ~128);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.type.serialized());
            if (this.title) data.push(this.title.serialized());
            if (this.description) data.push(this.description.serialized());
            if (this.url) data.push(this.url.serialized());
            if (this.thumbUrl) data.push(this.thumbUrl.serialized());
            if (this.contentUrl) data.push(this.contentUrl.serialized());
            if (this.contentType) data.push(this.contentType.serialized());
            if (this.w) data.push(this.w.serialized());
            if (this.h) data.push(this.h.serialized());
            if (this.duration) data.push(this.duration.serialized());
            data.push(this.sendMessage.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLString,
            readonly type: TLString,
            readonly title: TLString | undefined,
            readonly description: TLString | undefined,
            readonly url: TLString | undefined,
            readonly thumbUrl: TLString | undefined,
            readonly contentUrl: TLString | undefined,
            readonly contentType: TLString | undefined,
            readonly w: TLInt | undefined,
            readonly h: TLInt | undefined,
            readonly duration: TLInt | undefined,
            readonly sendMessage: BotInlineMessageType) {}
    
    } // class BotInlineResult
    

    export class BotInlineMediaResult implements TLObject {
        static readonly cons = new TLInt(0x17db940b);
    
        static deserialized(_data: ByteStream): BotInlineMediaResult | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotInlineMediaResult.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const id = TLString.deserialized(_data);
            if (!id) return undefined;
            const type = TLString.deserialized(_data);
            if (!type) return undefined;
            let photo: PhotoType | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = deserializedObject(_data) as PhotoType;
                if (!obj) return undefined;
                photo = obj
            }
            let document: DocumentType | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = deserializedObject(_data) as DocumentType;
                if (!obj) return undefined;
                document = obj
            }
            let title: TLString | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                title = obj
            }
            let description: TLString | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                description = obj
            }
            const sendMessage = deserializedObject(_data) as BotInlineMessageType;
            if (!sendMessage) return undefined;
            
            return new BotInlineMediaResult(
                id,
                type,
                photo,
                document,
                title,
                description,
                sendMessage)
        }
    
        serialized(): Uint8Array {
            const constructor = BotInlineMediaResult.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.photo) ? (flags | 1) : (flags & ~1);
            flags = (!this.document) ? (flags | 2) : (flags & ~2);
            flags = (!this.title) ? (flags | 4) : (flags & ~4);
            flags = (!this.description) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.type.serialized());
            if (this.photo) data.push(this.photo.serialized());
            if (this.document) data.push(this.document.serialized());
            if (this.title) data.push(this.title.serialized());
            if (this.description) data.push(this.description.serialized());
            data.push(this.sendMessage.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLString,
            readonly type: TLString,
            readonly photo: PhotoType | undefined,
            readonly document: DocumentType | undefined,
            readonly title: TLString | undefined,
            readonly description: TLString | undefined,
            readonly sendMessage: BotInlineMessageType) {}
    
    } // class BotInlineMediaResult
    

    export namespace messages {
    export class BotResults implements TLObject {
        static readonly cons = new TLInt(0x256709a6);
    
        static deserialized(_data: ByteStream): BotResults | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotResults.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const gallery = (flags.value & 1) !== 0;
            const queryId = TLLong.deserialized(_data);
            if (!queryId) return undefined;
            let nextOffset: TLString | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                nextOffset = obj
            }
            let switchPm: InlineBotSwitchPM | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = deserializedObject(_data) as InlineBotSwitchPM;
                if (!obj) return undefined;
                switchPm = obj
            }
            const results = TLVector.deserialized(_data, ) as TLVector<BotInlineResultType>;
            if (!results) return undefined;
            return new BotResults(
                gallery,
                queryId,
                nextOffset,
                switchPm,
                results)
        }
    
        serialized(): Uint8Array {
            const constructor = BotResults.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.gallery) ? (flags | 1) : (flags & ~1);
            flags = (!this.nextOffset) ? (flags | 2) : (flags & ~2);
            flags = (!this.switchPm) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.queryId.serialized());
            if (this.nextOffset) data.push(this.nextOffset.serialized());
            if (this.switchPm) data.push(this.switchPm.serialized());
            data.push(this.results.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly gallery: boolean,
            readonly queryId: TLLong,
            readonly nextOffset: TLString | undefined,
            readonly switchPm: InlineBotSwitchPM | undefined,
            readonly results: TLVector<BotInlineResultType>) {}
    
    } // class BotResults
    } // namespace messages

    export class ExportedMessageLink implements TLObject {
        static readonly cons = new TLInt(0x1f486803);
    
        static deserialized(_data: ByteStream): ExportedMessageLink | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ExportedMessageLink.cons)) return undefined;
            const link = TLString.deserialized(_data);
            if (!link) return undefined;
            return new ExportedMessageLink(
                link)
        }
    
        serialized(): Uint8Array {
            const constructor = ExportedMessageLink.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.link.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly link: TLString) {}
    
    } // class ExportedMessageLink
    

    export class MessageFwdHeader implements TLObject {
        static readonly cons = new TLInt(0xc786ddcb);
    
        static deserialized(_data: ByteStream): MessageFwdHeader | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageFwdHeader.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            let fromId: TLInt | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                fromId = obj
            }
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            let channelId: TLInt | undefined;
            if ((flags.value & 2) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                channelId = obj
            }
            let channelPost: TLInt | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                channelPost = obj
            }
            return new MessageFwdHeader(
                fromId,
                date,
                channelId,
                channelPost)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageFwdHeader.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.fromId) ? (flags | 1) : (flags & ~1);
            flags = (!this.channelId) ? (flags | 2) : (flags & ~2);
            flags = (!this.channelPost) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            if (this.fromId) data.push(this.fromId.serialized());
            data.push(this.date.serialized());
            if (this.channelId) data.push(this.channelId.serialized());
            if (this.channelPost) data.push(this.channelPost.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly fromId: TLInt | undefined,
            readonly date: TLInt,
            readonly channelId: TLInt | undefined,
            readonly channelPost: TLInt | undefined) {}
    
    } // class MessageFwdHeader
    

    export namespace auth {
    export class CodeTypeSms implements TLObject {
        static readonly cons = new TLInt(0x72a3158c);
    
        static deserialized(_data: ByteStream): CodeTypeSms | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(CodeTypeSms.cons)) return undefined;
            return new CodeTypeSms()
        }
    
        serialized(): Uint8Array {
            const constructor = CodeTypeSms.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class CodeTypeSms
    } // namespace auth

    export namespace auth {
    export class CodeTypeCall implements TLObject {
        static readonly cons = new TLInt(0x741cd3e3);
    
        static deserialized(_data: ByteStream): CodeTypeCall | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(CodeTypeCall.cons)) return undefined;
            return new CodeTypeCall()
        }
    
        serialized(): Uint8Array {
            const constructor = CodeTypeCall.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class CodeTypeCall
    } // namespace auth

    export namespace auth {
    export class CodeTypeFlashCall implements TLObject {
        static readonly cons = new TLInt(0x226ccefb);
    
        static deserialized(_data: ByteStream): CodeTypeFlashCall | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(CodeTypeFlashCall.cons)) return undefined;
            return new CodeTypeFlashCall()
        }
    
        serialized(): Uint8Array {
            const constructor = CodeTypeFlashCall.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class CodeTypeFlashCall
    } // namespace auth

    export namespace auth {
    export class SentCodeTypeApp implements TLObject {
        static readonly cons = new TLInt(0x3dbb5986);
    
        static deserialized(_data: ByteStream): SentCodeTypeApp | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SentCodeTypeApp.cons)) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new SentCodeTypeApp(
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = SentCodeTypeApp.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly length: TLInt) {}
    
    } // class SentCodeTypeApp
    } // namespace auth

    export namespace auth {
    export class SentCodeTypeSms implements TLObject {
        static readonly cons = new TLInt(0xc000bba2);
    
        static deserialized(_data: ByteStream): SentCodeTypeSms | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SentCodeTypeSms.cons)) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new SentCodeTypeSms(
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = SentCodeTypeSms.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly length: TLInt) {}
    
    } // class SentCodeTypeSms
    } // namespace auth

    export namespace auth {
    export class SentCodeTypeCall implements TLObject {
        static readonly cons = new TLInt(0x5353e5a7);
    
        static deserialized(_data: ByteStream): SentCodeTypeCall | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SentCodeTypeCall.cons)) return undefined;
            const length = TLInt.deserialized(_data);
            if (!length) return undefined;
            return new SentCodeTypeCall(
                length)
        }
    
        serialized(): Uint8Array {
            const constructor = SentCodeTypeCall.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.length.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly length: TLInt) {}
    
    } // class SentCodeTypeCall
    } // namespace auth

    export namespace auth {
    export class SentCodeTypeFlashCall implements TLObject {
        static readonly cons = new TLInt(0xab03c6d9);
    
        static deserialized(_data: ByteStream): SentCodeTypeFlashCall | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(SentCodeTypeFlashCall.cons)) return undefined;
            const pattern = TLString.deserialized(_data);
            if (!pattern) return undefined;
            return new SentCodeTypeFlashCall(
                pattern)
        }
    
        serialized(): Uint8Array {
            const constructor = SentCodeTypeFlashCall.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.pattern.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly pattern: TLString) {}
    
    } // class SentCodeTypeFlashCall
    } // namespace auth

    export namespace messages {
    export class BotCallbackAnswer implements TLObject {
        static readonly cons = new TLInt(0xb10df1fb);
    
        static deserialized(_data: ByteStream): BotCallbackAnswer | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(BotCallbackAnswer.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const alert = (flags.value & 2) !== 0;
            const hasUrl = (flags.value & 8) !== 0;
            let message: TLString | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                message = obj
            }
            let url: TLString | undefined;
            if ((flags.value & 4) !== 0) {
                const obj = TLString.deserialized(_data);
                if (!obj) return undefined;
                url = obj
            }
            return new BotCallbackAnswer(
                alert,
                hasUrl,
                message,
                url)
        }
    
        serialized(): Uint8Array {
            const constructor = BotCallbackAnswer.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.alert) ? (flags | 2) : (flags & ~2);
            flags = (this.hasUrl) ? (flags | 8) : (flags & ~8);
            flags = (!this.message) ? (flags | 1) : (flags & ~1);
            flags = (!this.url) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            if (this.message) data.push(this.message.serialized());
            if (this.url) data.push(this.url.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly alert: boolean,
            readonly hasUrl: boolean,
            readonly message: TLString | undefined,
            readonly url: TLString | undefined) {}
    
    } // class BotCallbackAnswer
    } // namespace messages

    export namespace messages {
    export class MessageEditData implements TLObject {
        static readonly cons = new TLInt(0x26b5dde6);
    
        static deserialized(_data: ByteStream): MessageEditData | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MessageEditData.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const caption = (flags.value & 1) !== 0;
            return new MessageEditData(
                caption)
        }
    
        serialized(): Uint8Array {
            const constructor = MessageEditData.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.caption) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly caption: boolean) {}
    
    } // class MessageEditData
    } // namespace messages

    export class InputBotInlineMessageID implements TLObject {
        static readonly cons = new TLInt(0x890c3d89);
    
        static deserialized(_data: ByteStream): InputBotInlineMessageID | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputBotInlineMessageID.cons)) return undefined;
            const dcId = TLInt.deserialized(_data);
            if (!dcId) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputBotInlineMessageID(
                dcId,
                id,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputBotInlineMessageID.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.dcId.serialized());
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly dcId: TLInt,
            readonly id: TLLong,
            readonly accessHash: TLLong) {}
    
    } // class InputBotInlineMessageID
    

    export class InlineBotSwitchPM implements TLObject {
        static readonly cons = new TLInt(0x3c20629f);
    
        static deserialized(_data: ByteStream): InlineBotSwitchPM | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InlineBotSwitchPM.cons)) return undefined;
            const text = TLString.deserialized(_data);
            if (!text) return undefined;
            const startParam = TLString.deserialized(_data);
            if (!startParam) return undefined;
            return new InlineBotSwitchPM(
                text,
                startParam)
        }
    
        serialized(): Uint8Array {
            const constructor = InlineBotSwitchPM.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.text.serialized());
            data.push(this.startParam.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly text: TLString,
            readonly startParam: TLString) {}
    
    } // class InlineBotSwitchPM
    

    export namespace messages {
    export class PeerDialogs implements TLObject {
        static readonly cons = new TLInt(0x3371c354);
    
        static deserialized(_data: ByteStream): PeerDialogs | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(PeerDialogs.cons)) return undefined;
            const dialogs = TLVector.deserialized(_data, Dialog) as TLVector<Dialog>;
            if (!dialogs) return undefined;
            const messages = TLVector.deserialized(_data, ) as TLVector<MessageType>;
            if (!messages) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            const state = deserializedObject(_data) as updates.State;
            if (!state) return undefined;
            
            return new PeerDialogs(
                dialogs,
                messages,
                chats,
                users,
                state)
        }
    
        serialized(): Uint8Array {
            const constructor = PeerDialogs.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.dialogs.serialized());
            data.push(this.messages.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
            data.push(this.state.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly dialogs: TLVector<Dialog>,
            readonly messages: TLVector<MessageType>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>,
            readonly state: updates.State) {}
    
    } // class PeerDialogs
    } // namespace messages

    export class TopPeer implements TLObject {
        static readonly cons = new TLInt(0xedcdc05b);
    
        static deserialized(_data: ByteStream): TopPeer | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TopPeer.cons)) return undefined;
            const peer = deserializedObject(_data) as PeerType;
            if (!peer) return undefined;
            
            const rating = TLDouble.deserialized(_data);
            if (!rating) return undefined;
            return new TopPeer(
                peer,
                rating)
        }
    
        serialized(): Uint8Array {
            const constructor = TopPeer.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.rating.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: PeerType,
            readonly rating: TLDouble) {}
    
    } // class TopPeer
    

    export class TopPeerCategoryBotsPM implements TLObject {
        static readonly cons = new TLInt(0xab661b5b);
    
        static deserialized(_data: ByteStream): TopPeerCategoryBotsPM | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TopPeerCategoryBotsPM.cons)) return undefined;
            return new TopPeerCategoryBotsPM()
        }
    
        serialized(): Uint8Array {
            const constructor = TopPeerCategoryBotsPM.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class TopPeerCategoryBotsPM
    

    export class TopPeerCategoryBotsInline implements TLObject {
        static readonly cons = new TLInt(0x148677e2);
    
        static deserialized(_data: ByteStream): TopPeerCategoryBotsInline | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TopPeerCategoryBotsInline.cons)) return undefined;
            return new TopPeerCategoryBotsInline()
        }
    
        serialized(): Uint8Array {
            const constructor = TopPeerCategoryBotsInline.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class TopPeerCategoryBotsInline
    

    export class TopPeerCategoryCorrespondents implements TLObject {
        static readonly cons = new TLInt(0x637b7ed);
    
        static deserialized(_data: ByteStream): TopPeerCategoryCorrespondents | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TopPeerCategoryCorrespondents.cons)) return undefined;
            return new TopPeerCategoryCorrespondents()
        }
    
        serialized(): Uint8Array {
            const constructor = TopPeerCategoryCorrespondents.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class TopPeerCategoryCorrespondents
    

    export class TopPeerCategoryGroups implements TLObject {
        static readonly cons = new TLInt(0xbd17a14a);
    
        static deserialized(_data: ByteStream): TopPeerCategoryGroups | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TopPeerCategoryGroups.cons)) return undefined;
            return new TopPeerCategoryGroups()
        }
    
        serialized(): Uint8Array {
            const constructor = TopPeerCategoryGroups.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class TopPeerCategoryGroups
    

    export class TopPeerCategoryChannels implements TLObject {
        static readonly cons = new TLInt(0x161d9628);
    
        static deserialized(_data: ByteStream): TopPeerCategoryChannels | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TopPeerCategoryChannels.cons)) return undefined;
            return new TopPeerCategoryChannels()
        }
    
        serialized(): Uint8Array {
            const constructor = TopPeerCategoryChannels.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class TopPeerCategoryChannels
    

    export class TopPeerCategoryPeers implements TLObject {
        static readonly cons = new TLInt(0xfb834291);
    
        static deserialized(_data: ByteStream): TopPeerCategoryPeers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TopPeerCategoryPeers.cons)) return undefined;
            const category = deserializedObject(_data) as TopPeerCategoryType;
            if (!category) return undefined;
            
            const count = TLInt.deserialized(_data);
            if (!count) return undefined;
            const peers = TLVector.deserialized(_data, TopPeer) as TLVector<TopPeer>;
            if (!peers) return undefined;
            return new TopPeerCategoryPeers(
                category,
                count,
                peers)
        }
    
        serialized(): Uint8Array {
            const constructor = TopPeerCategoryPeers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.category.serialized());
            data.push(this.count.serialized());
            data.push(this.peers.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly category: TopPeerCategoryType,
            readonly count: TLInt,
            readonly peers: TLVector<TopPeer>) {}
    
    } // class TopPeerCategoryPeers
    

    export namespace contacts {
    export class TopPeersNotModified implements TLObject {
        static readonly cons = new TLInt(0xde266ef5);
    
        static deserialized(_data: ByteStream): TopPeersNotModified | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TopPeersNotModified.cons)) return undefined;
            return new TopPeersNotModified()
        }
    
        serialized(): Uint8Array {
            const constructor = TopPeersNotModified.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class TopPeersNotModified
    } // namespace contacts

    export namespace contacts {
    export class TopPeers implements TLObject {
        static readonly cons = new TLInt(0x70b772a8);
    
        static deserialized(_data: ByteStream): TopPeers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(TopPeers.cons)) return undefined;
            const categories = TLVector.deserialized(_data, TopPeerCategoryPeers) as TLVector<TopPeerCategoryPeers>;
            if (!categories) return undefined;
            const chats = TLVector.deserialized(_data, ) as TLVector<ChatType>;
            if (!chats) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new TopPeers(
                categories,
                chats,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = TopPeers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.categories.serialized());
            data.push(this.chats.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly categories: TLVector<TopPeerCategoryPeers>,
            readonly chats: TLVector<ChatType>,
            readonly users: TLVector<UserType>) {}
    
    } // class TopPeers
    } // namespace contacts

    export class DraftMessageEmpty implements TLObject {
        static readonly cons = new TLInt(0xba4baec5);
    
        static deserialized(_data: ByteStream): DraftMessageEmpty | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DraftMessageEmpty.cons)) return undefined;
            return new DraftMessageEmpty()
        }
    
        serialized(): Uint8Array {
            const constructor = DraftMessageEmpty.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class DraftMessageEmpty
    

    export class DraftMessage implements TLObject {
        static readonly cons = new TLInt(0xfd8e711f);
    
        static deserialized(_data: ByteStream): DraftMessage | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(DraftMessage.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const noWebpage = (flags.value & 2) !== 0;
            let replyToMsgId: TLInt | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = TLInt.deserialized(_data);
                if (!obj) return undefined;
                replyToMsgId = obj
            }
            const message = TLString.deserialized(_data);
            if (!message) return undefined;
            let entities: TLVector<MessageEntityType> | undefined;
            if ((flags.value & 8) !== 0) {
                const obj = TLVector.deserialized(_data, ) as TLVector<MessageEntityType>;
                if (!obj) return undefined;
                entities = obj
            }
            const date = TLInt.deserialized(_data);
            if (!date) return undefined;
            return new DraftMessage(
                noWebpage,
                replyToMsgId,
                message,
                entities,
                date)
        }
    
        serialized(): Uint8Array {
            const constructor = DraftMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.noWebpage) ? (flags | 2) : (flags & ~2);
            flags = (!this.replyToMsgId) ? (flags | 1) : (flags & ~1);
            flags = (!this.entities) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            if (this.replyToMsgId) data.push(this.replyToMsgId.serialized());
            data.push(this.message.serialized());
            if (this.entities) data.push(this.entities.serialized());
            data.push(this.date.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly noWebpage: boolean,
            readonly replyToMsgId: TLInt | undefined,
            readonly message: TLString,
            readonly entities: TLVector<MessageEntityType> | undefined,
            readonly date: TLInt) {}
    
    } // class DraftMessage
    

    export namespace messages {
    export class FeaturedStickersNotModified implements TLObject {
        static readonly cons = new TLInt(0x4ede3cf);
    
        static deserialized(_data: ByteStream): FeaturedStickersNotModified | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FeaturedStickersNotModified.cons)) return undefined;
            return new FeaturedStickersNotModified()
        }
    
        serialized(): Uint8Array {
            const constructor = FeaturedStickersNotModified.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class FeaturedStickersNotModified
    } // namespace messages

    export namespace messages {
    export class FeaturedStickers implements TLObject {
        static readonly cons = new TLInt(0xf89d88e5);
    
        static deserialized(_data: ByteStream): FeaturedStickers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(FeaturedStickers.cons)) return undefined;
            const hash = TLInt.deserialized(_data);
            if (!hash) return undefined;
            const sets = TLVector.deserialized(_data, ) as TLVector<StickerSetCoveredType>;
            if (!sets) return undefined;
            const unread = TLVector.deserialized(_data, TLLong) as TLVector<TLLong>;
            if (!unread) return undefined;
            return new FeaturedStickers(
                hash,
                sets,
                unread)
        }
    
        serialized(): Uint8Array {
            const constructor = FeaturedStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
            data.push(this.sets.serialized());
            data.push(this.unread.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLInt,
            readonly sets: TLVector<StickerSetCoveredType>,
            readonly unread: TLVector<TLLong>) {}
    
    } // class FeaturedStickers
    } // namespace messages

    export namespace messages {
    export class RecentStickersNotModified implements TLObject {
        static readonly cons = new TLInt(0xb17f890);
    
        static deserialized(_data: ByteStream): RecentStickersNotModified | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(RecentStickersNotModified.cons)) return undefined;
            return new RecentStickersNotModified()
        }
    
        serialized(): Uint8Array {
            const constructor = RecentStickersNotModified.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class RecentStickersNotModified
    } // namespace messages

    export namespace messages {
    export class RecentStickers implements TLObject {
        static readonly cons = new TLInt(0x5ce20970);
    
        static deserialized(_data: ByteStream): RecentStickers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(RecentStickers.cons)) return undefined;
            const hash = TLInt.deserialized(_data);
            if (!hash) return undefined;
            const stickers = TLVector.deserialized(_data, ) as TLVector<DocumentType>;
            if (!stickers) return undefined;
            return new RecentStickers(
                hash,
                stickers)
        }
    
        serialized(): Uint8Array {
            const constructor = RecentStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
            data.push(this.stickers.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLInt,
            readonly stickers: TLVector<DocumentType>) {}
    
    } // class RecentStickers
    } // namespace messages

    export namespace messages {
    export class ArchivedStickers implements TLObject {
        static readonly cons = new TLInt(0x4fcba9c8);
    
        static deserialized(_data: ByteStream): ArchivedStickers | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(ArchivedStickers.cons)) return undefined;
            const count = TLInt.deserialized(_data);
            if (!count) return undefined;
            const sets = TLVector.deserialized(_data, ) as TLVector<StickerSetCoveredType>;
            if (!sets) return undefined;
            return new ArchivedStickers(
                count,
                sets)
        }
    
        serialized(): Uint8Array {
            const constructor = ArchivedStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.count.serialized());
            data.push(this.sets.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly count: TLInt,
            readonly sets: TLVector<StickerSetCoveredType>) {}
    
    } // class ArchivedStickers
    } // namespace messages

    export namespace messages {
    export class StickerSetInstallResultSuccess implements TLObject {
        static readonly cons = new TLInt(0x38641628);
    
        static deserialized(_data: ByteStream): StickerSetInstallResultSuccess | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(StickerSetInstallResultSuccess.cons)) return undefined;
            return new StickerSetInstallResultSuccess()
        }
    
        serialized(): Uint8Array {
            const constructor = StickerSetInstallResultSuccess.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class StickerSetInstallResultSuccess
    } // namespace messages

    export namespace messages {
    export class StickerSetInstallResultArchive implements TLObject {
        static readonly cons = new TLInt(0x35e410a8);
    
        static deserialized(_data: ByteStream): StickerSetInstallResultArchive | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(StickerSetInstallResultArchive.cons)) return undefined;
            const sets = TLVector.deserialized(_data, ) as TLVector<StickerSetCoveredType>;
            if (!sets) return undefined;
            return new StickerSetInstallResultArchive(
                sets)
        }
    
        serialized(): Uint8Array {
            const constructor = StickerSetInstallResultArchive.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.sets.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly sets: TLVector<StickerSetCoveredType>) {}
    
    } // class StickerSetInstallResultArchive
    } // namespace messages

    export class StickerSetCovered implements TLObject {
        static readonly cons = new TLInt(0x6410a5d2);
    
        static deserialized(_data: ByteStream): StickerSetCovered | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(StickerSetCovered.cons)) return undefined;
            const set = deserializedObject(_data) as StickerSet;
            if (!set) return undefined;
            
            const cover = deserializedObject(_data) as DocumentType;
            if (!cover) return undefined;
            
            return new StickerSetCovered(
                set,
                cover)
        }
    
        serialized(): Uint8Array {
            const constructor = StickerSetCovered.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.set.serialized());
            data.push(this.cover.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly set: StickerSet,
            readonly cover: DocumentType) {}
    
    } // class StickerSetCovered
    

    export class StickerSetMultiCovered implements TLObject {
        static readonly cons = new TLInt(0x3407e51b);
    
        static deserialized(_data: ByteStream): StickerSetMultiCovered | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(StickerSetMultiCovered.cons)) return undefined;
            const set = deserializedObject(_data) as StickerSet;
            if (!set) return undefined;
            
            const covers = TLVector.deserialized(_data, ) as TLVector<DocumentType>;
            if (!covers) return undefined;
            return new StickerSetMultiCovered(
                set,
                covers)
        }
    
        serialized(): Uint8Array {
            const constructor = StickerSetMultiCovered.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.set.serialized());
            data.push(this.covers.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly set: StickerSet,
            readonly covers: TLVector<DocumentType>) {}
    
    } // class StickerSetMultiCovered
    

    export class MaskCoords implements TLObject {
        static readonly cons = new TLInt(0xaed6dbb2);
    
        static deserialized(_data: ByteStream): MaskCoords | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(MaskCoords.cons)) return undefined;
            const n = TLInt.deserialized(_data);
            if (!n) return undefined;
            const x = TLDouble.deserialized(_data);
            if (!x) return undefined;
            const y = TLDouble.deserialized(_data);
            if (!y) return undefined;
            const zoom = TLDouble.deserialized(_data);
            if (!zoom) return undefined;
            return new MaskCoords(
                n,
                x,
                y,
                zoom)
        }
    
        serialized(): Uint8Array {
            const constructor = MaskCoords.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.n.serialized());
            data.push(this.x.serialized());
            data.push(this.y.serialized());
            data.push(this.zoom.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly n: TLInt,
            readonly x: TLDouble,
            readonly y: TLDouble,
            readonly zoom: TLDouble) {}
    
    } // class MaskCoords
    

    export class InputStickeredMediaPhoto implements TLObject {
        static readonly cons = new TLInt(0x4a992157);
    
        static deserialized(_data: ByteStream): InputStickeredMediaPhoto | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputStickeredMediaPhoto.cons)) return undefined;
            const id = deserializedObject(_data) as InputPhotoType;
            if (!id) return undefined;
            
            return new InputStickeredMediaPhoto(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = InputStickeredMediaPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputPhotoType) {}
    
    } // class InputStickeredMediaPhoto
    

    export class InputStickeredMediaDocument implements TLObject {
        static readonly cons = new TLInt(0x438865b);
    
        static deserialized(_data: ByteStream): InputStickeredMediaDocument | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputStickeredMediaDocument.cons)) return undefined;
            const id = deserializedObject(_data) as InputDocumentType;
            if (!id) return undefined;
            
            return new InputStickeredMediaDocument(
                id)
        }
    
        serialized(): Uint8Array {
            const constructor = InputStickeredMediaDocument.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputDocumentType) {}
    
    } // class InputStickeredMediaDocument
    

    export class Game implements TLObject {
        static readonly cons = new TLInt(0xbdf9653b);
    
        static deserialized(_data: ByteStream): Game | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(Game.cons)) return undefined;
            const flags = TLInt.deserialized(_data);
            if (!flags) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            const shortName = TLString.deserialized(_data);
            if (!shortName) return undefined;
            const title = TLString.deserialized(_data);
            if (!title) return undefined;
            const description = TLString.deserialized(_data);
            if (!description) return undefined;
            const photo = deserializedObject(_data) as PhotoType;
            if (!photo) return undefined;
            
            let document: DocumentType | undefined;
            if ((flags.value & 1) !== 0) {
                const obj = deserializedObject(_data) as DocumentType;
                if (!obj) return undefined;
                document = obj
            }
            return new Game(
                id,
                accessHash,
                shortName,
                title,
                description,
                photo,
                document)
        }
    
        serialized(): Uint8Array {
            const constructor = Game.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.document) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
            data.push(this.shortName.serialized());
            data.push(this.title.serialized());
            data.push(this.description.serialized());
            data.push(this.photo.serialized());
            if (this.document) data.push(this.document.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong,
            readonly shortName: TLString,
            readonly title: TLString,
            readonly description: TLString,
            readonly photo: PhotoType,
            readonly document: DocumentType | undefined) {}
    
    } // class Game
    

    export class InputGameID implements TLObject {
        static readonly cons = new TLInt(0x32c3e77);
    
        static deserialized(_data: ByteStream): InputGameID | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputGameID.cons)) return undefined;
            const id = TLLong.deserialized(_data);
            if (!id) return undefined;
            const accessHash = TLLong.deserialized(_data);
            if (!accessHash) return undefined;
            return new InputGameID(
                id,
                accessHash)
        }
    
        serialized(): Uint8Array {
            const constructor = InputGameID.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.accessHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLLong,
            readonly accessHash: TLLong) {}
    
    } // class InputGameID
    

    export class InputGameShortName implements TLObject {
        static readonly cons = new TLInt(0xc331e80a);
    
        static deserialized(_data: ByteStream): InputGameShortName | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(InputGameShortName.cons)) return undefined;
            const botId = deserializedObject(_data) as InputUserType;
            if (!botId) return undefined;
            
            const shortName = TLString.deserialized(_data);
            if (!shortName) return undefined;
            return new InputGameShortName(
                botId,
                shortName)
        }
    
        serialized(): Uint8Array {
            const constructor = InputGameShortName.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.botId.serialized());
            data.push(this.shortName.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly botId: InputUserType,
            readonly shortName: TLString) {}
    
    } // class InputGameShortName
    

    export class HighScore implements TLObject {
        static readonly cons = new TLInt(0x58fffcd0);
    
        static deserialized(_data: ByteStream): HighScore | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(HighScore.cons)) return undefined;
            const pos = TLInt.deserialized(_data);
            if (!pos) return undefined;
            const userId = TLInt.deserialized(_data);
            if (!userId) return undefined;
            const score = TLInt.deserialized(_data);
            if (!score) return undefined;
            return new HighScore(
                pos,
                userId,
                score)
        }
    
        serialized(): Uint8Array {
            const constructor = HighScore.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.pos.serialized());
            data.push(this.userId.serialized());
            data.push(this.score.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly pos: TLInt,
            readonly userId: TLInt,
            readonly score: TLInt) {}
    
    } // class HighScore
    

    export namespace messages {
    export class HighScores implements TLObject {
        static readonly cons = new TLInt(0x9a3bfd99);
    
        static deserialized(_data: ByteStream): HighScores | undefined {
            const constructor = TLInt.deserialized(_data);
            if (!constructor || !constructor.equals(HighScores.cons)) return undefined;
            const scores = TLVector.deserialized(_data, HighScore) as TLVector<HighScore>;
            if (!scores) return undefined;
            const users = TLVector.deserialized(_data, ) as TLVector<UserType>;
            if (!users) return undefined;
            return new HighScores(
                scores,
                users)
        }
    
        serialized(): Uint8Array {
            const constructor = HighScores.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.scores.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly scores: TLVector<HighScore>,
            readonly users: TLVector<UserType>) {}
    
    } // class HighScores
    } // namespace messages

    export class InvokeAfterMsg implements TLFunction<TLObject> {
        static readonly cons = new TLInt(0xcb9f372d);
    
        serialized(): Uint8Array {
            const constructor = InvokeAfterMsg.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.msgId.serialized());
            data.push(this.query.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly msgId: TLLong,
            readonly query: TLObject) {}
    
    } // class InvokeAfterMsg
    

    export class InvokeAfterMsgs implements TLFunction<TLObject> {
        static readonly cons = new TLInt(0x3dc4b4f0);
    
        serialized(): Uint8Array {
            const constructor = InvokeAfterMsgs.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.msgIds.serialized());
            data.push(this.query.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly msgIds: TLVector<TLLong>,
            readonly query: TLObject) {}
    
    } // class InvokeAfterMsgs
    

    export class InitConnection implements TLFunction<TLObject> {
        static readonly cons = new TLInt(0x69796de9);
    
        serialized(): Uint8Array {
            const constructor = InitConnection.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.apiId.serialized());
            data.push(this.deviceModel.serialized());
            data.push(this.systemVersion.serialized());
            data.push(this.appVersion.serialized());
            data.push(this.langCode.serialized());
            data.push(this.query.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly apiId: TLInt,
            readonly deviceModel: TLString,
            readonly systemVersion: TLString,
            readonly appVersion: TLString,
            readonly langCode: TLString,
            readonly query: TLObject) {}
    
    } // class InitConnection
    

    export class InvokeWithLayer implements TLFunction<TLObject> {
        static readonly cons = new TLInt(0xda9b0d0d);
    
        serialized(): Uint8Array {
            const constructor = InvokeWithLayer.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.layer.serialized());
            data.push(this.query.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly layer: TLInt,
            readonly query: TLObject) {}
    
    } // class InvokeWithLayer
    

    export class InvokeWithoutUpdates implements TLFunction<TLObject> {
        static readonly cons = new TLInt(0xbf9459b7);
    
        serialized(): Uint8Array {
            const constructor = InvokeWithoutUpdates.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.query.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly query: TLObject) {}
    
    } // class InvokeWithoutUpdates
    

    export namespace auth {
    export class CheckPhone implements TLFunction<auth.CheckedPhone> {
        static readonly cons = new TLInt(0x6fe51dfb);
    
        serialized(): Uint8Array {
            const constructor = CheckPhone.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumber.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString) {}
    
    } // class CheckPhone
    } // namespace auth

    export namespace auth {
    export class SendCode implements TLFunction<auth.SentCode> {
        static readonly cons = new TLInt(0x86aef0ec);
    
        serialized(): Uint8Array {
            const constructor = SendCode.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.allowFlashcall) ? (flags | 1) : (flags & ~1);
            flags = (!this.currentNumber) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.phoneNumber.serialized());
            if (this.currentNumber) data.push(this.currentNumber.serialized());
            data.push(this.apiId.serialized());
            data.push(this.apiHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly allowFlashcall: boolean,
            readonly phoneNumber: TLString,
            readonly currentNumber: BoolType | undefined,
            readonly apiId: TLInt,
            readonly apiHash: TLString) {}
    
    } // class SendCode
    } // namespace auth

    export namespace auth {
    export class SignUp implements TLFunction<auth.Authorization> {
        static readonly cons = new TLInt(0x1b067634);
    
        serialized(): Uint8Array {
            const constructor = SignUp.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumber.serialized());
            data.push(this.phoneCodeHash.serialized());
            data.push(this.phoneCode.serialized());
            data.push(this.firstName.serialized());
            data.push(this.lastName.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly phoneCodeHash: TLString,
            readonly phoneCode: TLString,
            readonly firstName: TLString,
            readonly lastName: TLString) {}
    
    } // class SignUp
    } // namespace auth

    export namespace auth {
    export class SignIn implements TLFunction<auth.Authorization> {
        static readonly cons = new TLInt(0xbcd51581);
    
        serialized(): Uint8Array {
            const constructor = SignIn.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumber.serialized());
            data.push(this.phoneCodeHash.serialized());
            data.push(this.phoneCode.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly phoneCodeHash: TLString,
            readonly phoneCode: TLString) {}
    
    } // class SignIn
    } // namespace auth

    export namespace auth {
    export class LogOut implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x5717da40);
    
        serialized(): Uint8Array {
            const constructor = LogOut.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class LogOut
    } // namespace auth

    export namespace auth {
    export class ResetAuthorizations implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x9fab0d1a);
    
        serialized(): Uint8Array {
            const constructor = ResetAuthorizations.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ResetAuthorizations
    } // namespace auth

    export namespace auth {
    export class SendInvites implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x771c1d97);
    
        serialized(): Uint8Array {
            const constructor = SendInvites.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumbers.serialized());
            data.push(this.message.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumbers: TLVector<TLString>,
            readonly message: TLString) {}
    
    } // class SendInvites
    } // namespace auth

    export namespace auth {
    export class ExportAuthorization implements TLFunction<auth.ExportedAuthorization> {
        static readonly cons = new TLInt(0xe5bfffcd);
    
        serialized(): Uint8Array {
            const constructor = ExportAuthorization.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.dcId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly dcId: TLInt) {}
    
    } // class ExportAuthorization
    } // namespace auth

    export namespace auth {
    export class ImportAuthorization implements TLFunction<auth.Authorization> {
        static readonly cons = new TLInt(0xe3ef9613);
    
        serialized(): Uint8Array {
            const constructor = ImportAuthorization.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.bytes.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLInt,
            readonly bytes: TLBytes) {}
    
    } // class ImportAuthorization
    } // namespace auth

    export namespace auth {
    export class BindTempAuthKey implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xcdd42a05);
    
        serialized(): Uint8Array {
            const constructor = BindTempAuthKey.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.permAuthKeyId.serialized());
            data.push(this.nonce.serialized());
            data.push(this.expiresAt.serialized());
            data.push(this.encryptedMessage.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly permAuthKeyId: TLLong,
            readonly nonce: TLLong,
            readonly expiresAt: TLInt,
            readonly encryptedMessage: TLBytes) {}
    
    } // class BindTempAuthKey
    } // namespace auth

    export namespace auth {
    export class ImportBotAuthorization implements TLFunction<auth.Authorization> {
        static readonly cons = new TLInt(0x67a3ff2c);
    
        serialized(): Uint8Array {
            const constructor = ImportBotAuthorization.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.flags.serialized());
            data.push(this.apiId.serialized());
            data.push(this.apiHash.serialized());
            data.push(this.botAuthToken.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly flags: TLInt,
            readonly apiId: TLInt,
            readonly apiHash: TLString,
            readonly botAuthToken: TLString) {}
    
    } // class ImportBotAuthorization
    } // namespace auth

    export namespace auth {
    export class CheckPassword implements TLFunction<auth.Authorization> {
        static readonly cons = new TLInt(0xa63011e);
    
        serialized(): Uint8Array {
            const constructor = CheckPassword.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.passwordHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly passwordHash: TLBytes) {}
    
    } // class CheckPassword
    } // namespace auth

    export namespace auth {
    export class RequestPasswordRecovery implements TLFunction<auth.PasswordRecovery> {
        static readonly cons = new TLInt(0xd897bc66);
    
        serialized(): Uint8Array {
            const constructor = RequestPasswordRecovery.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class RequestPasswordRecovery
    } // namespace auth

    export namespace auth {
    export class RecoverPassword implements TLFunction<auth.Authorization> {
        static readonly cons = new TLInt(0x4ea56e92);
    
        serialized(): Uint8Array {
            const constructor = RecoverPassword.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.code.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly code: TLString) {}
    
    } // class RecoverPassword
    } // namespace auth

    export namespace auth {
    export class ResendCode implements TLFunction<auth.SentCode> {
        static readonly cons = new TLInt(0x3ef1a9bf);
    
        serialized(): Uint8Array {
            const constructor = ResendCode.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumber.serialized());
            data.push(this.phoneCodeHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly phoneCodeHash: TLString) {}
    
    } // class ResendCode
    } // namespace auth

    export namespace auth {
    export class CancelCode implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x1f040578);
    
        serialized(): Uint8Array {
            const constructor = CancelCode.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumber.serialized());
            data.push(this.phoneCodeHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly phoneCodeHash: TLString) {}
    
    } // class CancelCode
    } // namespace auth

    export namespace auth {
    export class DropTempAuthKeys implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x8e48a188);
    
        serialized(): Uint8Array {
            const constructor = DropTempAuthKeys.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.exceptAuthKeys.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly exceptAuthKeys: TLVector<TLLong>) {}
    
    } // class DropTempAuthKeys
    } // namespace auth

    export namespace account {
    export class RegisterDevice implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x637ea878);
    
        serialized(): Uint8Array {
            const constructor = RegisterDevice.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.tokenType.serialized());
            data.push(this.token.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly tokenType: TLInt,
            readonly token: TLString) {}
    
    } // class RegisterDevice
    } // namespace account

    export namespace account {
    export class UnregisterDevice implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x65c55b40);
    
        serialized(): Uint8Array {
            const constructor = UnregisterDevice.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.tokenType.serialized());
            data.push(this.token.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly tokenType: TLInt,
            readonly token: TLString) {}
    
    } // class UnregisterDevice
    } // namespace account

    export namespace account {
    export class UpdateNotifySettings implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x84be5b93);
    
        serialized(): Uint8Array {
            const constructor = UpdateNotifySettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.settings.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputNotifyPeerType,
            readonly settings: InputPeerNotifySettings) {}
    
    } // class UpdateNotifySettings
    } // namespace account

    export namespace account {
    export class GetNotifySettings implements TLFunction<PeerNotifySettingsType> {
        static readonly cons = new TLInt(0x12b3ad31);
    
        serialized(): Uint8Array {
            const constructor = GetNotifySettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputNotifyPeerType) {}
    
    } // class GetNotifySettings
    } // namespace account

    export namespace account {
    export class ResetNotifySettings implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xdb7e1747);
    
        serialized(): Uint8Array {
            const constructor = ResetNotifySettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ResetNotifySettings
    } // namespace account

    export namespace account {
    export class UpdateProfile implements TLFunction<UserType> {
        static readonly cons = new TLInt(0x78515775);
    
        serialized(): Uint8Array {
            const constructor = UpdateProfile.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.firstName) ? (flags | 1) : (flags & ~1);
            flags = (!this.lastName) ? (flags | 2) : (flags & ~2);
            flags = (!this.about) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            if (this.firstName) data.push(this.firstName.serialized());
            if (this.lastName) data.push(this.lastName.serialized());
            if (this.about) data.push(this.about.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly firstName: TLString | undefined,
            readonly lastName: TLString | undefined,
            readonly about: TLString | undefined) {}
    
    } // class UpdateProfile
    } // namespace account

    export namespace account {
    export class UpdateStatus implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x6628562c);
    
        serialized(): Uint8Array {
            const constructor = UpdateStatus.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offline.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offline: BoolType) {}
    
    } // class UpdateStatus
    } // namespace account

    export namespace account {
    export class GetWallPapers implements TLFunction<TLVector<WallPaperType>> {
        static readonly cons = new TLInt(0xc04cfac2);
    
        serialized(): Uint8Array {
            const constructor = GetWallPapers.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetWallPapers
    } // namespace account

    export namespace account {
    export class ReportPeer implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xae189d5f);
    
        serialized(): Uint8Array {
            const constructor = ReportPeer.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.reason.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType,
            readonly reason: ReportReasonType) {}
    
    } // class ReportPeer
    } // namespace account

    export namespace account {
    export class CheckUsername implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x2714d86c);
    
        serialized(): Uint8Array {
            const constructor = CheckUsername.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.username.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly username: TLString) {}
    
    } // class CheckUsername
    } // namespace account

    export namespace account {
    export class UpdateUsername implements TLFunction<UserType> {
        static readonly cons = new TLInt(0x3e0bdd7c);
    
        serialized(): Uint8Array {
            const constructor = UpdateUsername.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.username.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly username: TLString) {}
    
    } // class UpdateUsername
    } // namespace account

    export namespace account {
    export class GetPrivacy implements TLFunction<account.PrivacyRules> {
        static readonly cons = new TLInt(0xdadbc950);
    
        serialized(): Uint8Array {
            const constructor = GetPrivacy.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.key.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly key: InputPrivacyKeyType) {}
    
    } // class GetPrivacy
    } // namespace account

    export namespace account {
    export class SetPrivacy implements TLFunction<account.PrivacyRules> {
        static readonly cons = new TLInt(0xc9f81ce8);
    
        serialized(): Uint8Array {
            const constructor = SetPrivacy.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.key.serialized());
            data.push(this.rules.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly key: InputPrivacyKeyType,
            readonly rules: TLVector<InputPrivacyRuleType>) {}
    
    } // class SetPrivacy
    } // namespace account

    export namespace account {
    export class DeleteAccount implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x418d4e0b);
    
        serialized(): Uint8Array {
            const constructor = DeleteAccount.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.reason.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly reason: TLString) {}
    
    } // class DeleteAccount
    } // namespace account

    export namespace account {
    export class GetAccountTTL implements TLFunction<AccountDaysTTL> {
        static readonly cons = new TLInt(0x8fc711d);
    
        serialized(): Uint8Array {
            const constructor = GetAccountTTL.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetAccountTTL
    } // namespace account

    export namespace account {
    export class SetAccountTTL implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x2442485e);
    
        serialized(): Uint8Array {
            const constructor = SetAccountTTL.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.ttl.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly ttl: AccountDaysTTL) {}
    
    } // class SetAccountTTL
    } // namespace account

    export namespace account {
    export class SendChangePhoneCode implements TLFunction<auth.SentCode> {
        static readonly cons = new TLInt(0x8e57deb);
    
        serialized(): Uint8Array {
            const constructor = SendChangePhoneCode.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.allowFlashcall) ? (flags | 1) : (flags & ~1);
            flags = (!this.currentNumber) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.phoneNumber.serialized());
            if (this.currentNumber) data.push(this.currentNumber.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly allowFlashcall: boolean,
            readonly phoneNumber: TLString,
            readonly currentNumber: BoolType | undefined) {}
    
    } // class SendChangePhoneCode
    } // namespace account

    export namespace account {
    export class ChangePhone implements TLFunction<UserType> {
        static readonly cons = new TLInt(0x70c32edb);
    
        serialized(): Uint8Array {
            const constructor = ChangePhone.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneNumber.serialized());
            data.push(this.phoneCodeHash.serialized());
            data.push(this.phoneCode.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneNumber: TLString,
            readonly phoneCodeHash: TLString,
            readonly phoneCode: TLString) {}
    
    } // class ChangePhone
    } // namespace account

    export namespace account {
    export class UpdateDeviceLocked implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x38df3532);
    
        serialized(): Uint8Array {
            const constructor = UpdateDeviceLocked.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.period.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly period: TLInt) {}
    
    } // class UpdateDeviceLocked
    } // namespace account

    export namespace account {
    export class GetAuthorizations implements TLFunction<account.Authorizations> {
        static readonly cons = new TLInt(0xe320c158);
    
        serialized(): Uint8Array {
            const constructor = GetAuthorizations.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetAuthorizations
    } // namespace account

    export namespace account {
    export class ResetAuthorization implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xdf77f3bc);
    
        serialized(): Uint8Array {
            const constructor = ResetAuthorization.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLLong) {}
    
    } // class ResetAuthorization
    } // namespace account

    export namespace account {
    export class GetPassword implements TLFunction<account.PasswordType> {
        static readonly cons = new TLInt(0x548a30f5);
    
        serialized(): Uint8Array {
            const constructor = GetPassword.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetPassword
    } // namespace account

    export namespace account {
    export class GetPasswordSettings implements TLFunction<account.PasswordSettings> {
        static readonly cons = new TLInt(0xbc8d11bb);
    
        serialized(): Uint8Array {
            const constructor = GetPasswordSettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.currentPasswordHash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly currentPasswordHash: TLBytes) {}
    
    } // class GetPasswordSettings
    } // namespace account

    export namespace account {
    export class UpdatePasswordSettings implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xfa7c4b86);
    
        serialized(): Uint8Array {
            const constructor = UpdatePasswordSettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.currentPasswordHash.serialized());
            data.push(this.newSettings.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly currentPasswordHash: TLBytes,
            readonly newSettings: account.PasswordInputSettings) {}
    
    } // class UpdatePasswordSettings
    } // namespace account

    export namespace account {
    export class SendConfirmPhoneCode implements TLFunction<auth.SentCode> {
        static readonly cons = new TLInt(0x1516d7bd);
    
        serialized(): Uint8Array {
            const constructor = SendConfirmPhoneCode.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.allowFlashcall) ? (flags | 1) : (flags & ~1);
            flags = (!this.currentNumber) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.hash.serialized());
            if (this.currentNumber) data.push(this.currentNumber.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly allowFlashcall: boolean,
            readonly hash: TLString,
            readonly currentNumber: BoolType | undefined) {}
    
    } // class SendConfirmPhoneCode
    } // namespace account

    export namespace account {
    export class ConfirmPhone implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x5f2178c3);
    
        serialized(): Uint8Array {
            const constructor = ConfirmPhone.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.phoneCodeHash.serialized());
            data.push(this.phoneCode.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly phoneCodeHash: TLString,
            readonly phoneCode: TLString) {}
    
    } // class ConfirmPhone
    } // namespace account

    export namespace users {
    export class GetUsers implements TLFunction<TLVector<UserType>> {
        static readonly cons = new TLInt(0xd91a548);
    
        serialized(): Uint8Array {
            const constructor = GetUsers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLVector<InputUserType>) {}
    
    } // class GetUsers
    } // namespace users

    export namespace users {
    export class GetFullUser implements TLFunction<UserFull> {
        static readonly cons = new TLInt(0xca30a5b1);
    
        serialized(): Uint8Array {
            const constructor = GetFullUser.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputUserType) {}
    
    } // class GetFullUser
    } // namespace users

    export namespace contacts {
    export class GetStatuses implements TLFunction<TLVector<ContactStatus>> {
        static readonly cons = new TLInt(0xc4a353ee);
    
        serialized(): Uint8Array {
            const constructor = GetStatuses.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetStatuses
    } // namespace contacts

    export namespace contacts {
    export class GetContacts implements TLFunction<contacts.ContactsType> {
        static readonly cons = new TLInt(0x22c6aa08);
    
        serialized(): Uint8Array {
            const constructor = GetContacts.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLString) {}
    
    } // class GetContacts
    } // namespace contacts

    export namespace contacts {
    export class ImportContacts implements TLFunction<contacts.ImportedContacts> {
        static readonly cons = new TLInt(0xda30b32d);
    
        serialized(): Uint8Array {
            const constructor = ImportContacts.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.contacts.serialized());
            data.push(this.replace.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly contacts: TLVector<InputContactType>,
            readonly replace: BoolType) {}
    
    } // class ImportContacts
    } // namespace contacts

    export namespace contacts {
    export class DeleteContact implements TLFunction<contacts.Link> {
        static readonly cons = new TLInt(0x8e953744);
    
        serialized(): Uint8Array {
            const constructor = DeleteContact.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputUserType) {}
    
    } // class DeleteContact
    } // namespace contacts

    export namespace contacts {
    export class DeleteContacts implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x59ab389e);
    
        serialized(): Uint8Array {
            const constructor = DeleteContacts.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLVector<InputUserType>) {}
    
    } // class DeleteContacts
    } // namespace contacts

    export namespace contacts {
    export class Block implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x332b49fc);
    
        serialized(): Uint8Array {
            const constructor = Block.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputUserType) {}
    
    } // class Block
    } // namespace contacts

    export namespace contacts {
    export class Unblock implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xe54100bd);
    
        serialized(): Uint8Array {
            const constructor = Unblock.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputUserType) {}
    
    } // class Unblock
    } // namespace contacts

    export namespace contacts {
    export class GetBlocked implements TLFunction<contacts.BlockedType> {
        static readonly cons = new TLInt(0xf57c350f);
    
        serialized(): Uint8Array {
            const constructor = GetBlocked.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offset.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offset: TLInt,
            readonly limit: TLInt) {}
    
    } // class GetBlocked
    } // namespace contacts

    export namespace contacts {
    export class ExportCard implements TLFunction<TLVector<TLInt>> {
        static readonly cons = new TLInt(0x84e53737);
    
        serialized(): Uint8Array {
            const constructor = ExportCard.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class ExportCard
    } // namespace contacts

    export namespace contacts {
    export class ImportCard implements TLFunction<UserType> {
        static readonly cons = new TLInt(0x4fe196fe);
    
        serialized(): Uint8Array {
            const constructor = ImportCard.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.exportCard.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly exportCard: TLVector<TLInt>) {}
    
    } // class ImportCard
    } // namespace contacts

    export namespace contacts {
    export class Search implements TLFunction<contacts.Found> {
        static readonly cons = new TLInt(0x11f812d8);
    
        serialized(): Uint8Array {
            const constructor = Search.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.q.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly q: TLString,
            readonly limit: TLInt) {}
    
    } // class Search
    } // namespace contacts

    export namespace contacts {
    export class ResolveUsername implements TLFunction<contacts.ResolvedPeer> {
        static readonly cons = new TLInt(0xf93ccba3);
    
        serialized(): Uint8Array {
            const constructor = ResolveUsername.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.username.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly username: TLString) {}
    
    } // class ResolveUsername
    } // namespace contacts

    export namespace contacts {
    export class GetTopPeers implements TLFunction<contacts.TopPeersType> {
        static readonly cons = new TLInt(0xd4982db5);
    
        serialized(): Uint8Array {
            const constructor = GetTopPeers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.correspondents) ? (flags | 1) : (flags & ~1);
            flags = (this.botsPm) ? (flags | 2) : (flags & ~2);
            flags = (this.botsInline) ? (flags | 4) : (flags & ~4);
            flags = (this.groups) ? (flags | 1024) : (flags & ~1024);
            flags = (this.channels) ? (flags | 32768) : (flags & ~32768);
            data.push(new TLInt(flags).serialized());
            data.push(this.offset.serialized());
            data.push(this.limit.serialized());
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly correspondents: boolean,
            readonly botsPm: boolean,
            readonly botsInline: boolean,
            readonly groups: boolean,
            readonly channels: boolean,
            readonly offset: TLInt,
            readonly limit: TLInt,
            readonly hash: TLInt) {}
    
    } // class GetTopPeers
    } // namespace contacts

    export namespace contacts {
    export class ResetTopPeerRating implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x1ae373ac);
    
        serialized(): Uint8Array {
            const constructor = ResetTopPeerRating.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.category.serialized());
            data.push(this.peer.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly category: TopPeerCategoryType,
            readonly peer: InputPeerType) {}
    
    } // class ResetTopPeerRating
    } // namespace contacts

    export namespace messages {
    export class GetMessages implements TLFunction<messages.MessagesType> {
        static readonly cons = new TLInt(0x4222fa74);
    
        serialized(): Uint8Array {
            const constructor = GetMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLVector<TLInt>) {}
    
    } // class GetMessages
    } // namespace messages

    export namespace messages {
    export class GetDialogs implements TLFunction<messages.DialogsType> {
        static readonly cons = new TLInt(0x6b47f94d);
    
        serialized(): Uint8Array {
            const constructor = GetDialogs.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.offsetDate.serialized());
            data.push(this.offsetId.serialized());
            data.push(this.offsetPeer.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly offsetDate: TLInt,
            readonly offsetId: TLInt,
            readonly offsetPeer: InputPeerType,
            readonly limit: TLInt) {}
    
    } // class GetDialogs
    } // namespace messages

    export namespace messages {
    export class GetHistory implements TLFunction<messages.MessagesType> {
        static readonly cons = new TLInt(0xafa92846);
    
        serialized(): Uint8Array {
            const constructor = GetHistory.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.offsetId.serialized());
            data.push(this.offsetDate.serialized());
            data.push(this.addOffset.serialized());
            data.push(this.limit.serialized());
            data.push(this.maxId.serialized());
            data.push(this.minId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType,
            readonly offsetId: TLInt,
            readonly offsetDate: TLInt,
            readonly addOffset: TLInt,
            readonly limit: TLInt,
            readonly maxId: TLInt,
            readonly minId: TLInt) {}
    
    } // class GetHistory
    } // namespace messages

    export namespace messages {
    export class Search implements TLFunction<messages.MessagesType> {
        static readonly cons = new TLInt(0xd4569248);
    
        serialized(): Uint8Array {
            const constructor = Search.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            data.push(new TLInt(flags).serialized());
            data.push(this.peer.serialized());
            data.push(this.q.serialized());
            data.push(this.filter.serialized());
            data.push(this.minDate.serialized());
            data.push(this.maxDate.serialized());
            data.push(this.offset.serialized());
            data.push(this.maxId.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType,
            readonly q: TLString,
            readonly filter: MessagesFilterType,
            readonly minDate: TLInt,
            readonly maxDate: TLInt,
            readonly offset: TLInt,
            readonly maxId: TLInt,
            readonly limit: TLInt) {}
    
    } // class Search
    } // namespace messages

    export namespace messages {
    export class ReadHistory implements TLFunction<messages.AffectedMessages> {
        static readonly cons = new TLInt(0xe306d3a);
    
        serialized(): Uint8Array {
            const constructor = ReadHistory.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.maxId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType,
            readonly maxId: TLInt) {}
    
    } // class ReadHistory
    } // namespace messages

    export namespace messages {
    export class DeleteHistory implements TLFunction<messages.AffectedHistory> {
        static readonly cons = new TLInt(0x1c015b09);
    
        serialized(): Uint8Array {
            const constructor = DeleteHistory.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.justClear) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.peer.serialized());
            data.push(this.maxId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly justClear: boolean,
            readonly peer: InputPeerType,
            readonly maxId: TLInt) {}
    
    } // class DeleteHistory
    } // namespace messages

    export namespace messages {
    export class DeleteMessages implements TLFunction<messages.AffectedMessages> {
        static readonly cons = new TLInt(0xa5f18925);
    
        serialized(): Uint8Array {
            const constructor = DeleteMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLVector<TLInt>) {}
    
    } // class DeleteMessages
    } // namespace messages

    export namespace messages {
    export class ReceivedMessages implements TLFunction<TLVector<ReceivedNotifyMessage>> {
        static readonly cons = new TLInt(0x5a954c0);
    
        serialized(): Uint8Array {
            const constructor = ReceivedMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.maxId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly maxId: TLInt) {}
    
    } // class ReceivedMessages
    } // namespace messages

    export namespace messages {
    export class SetTyping implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xa3825e50);
    
        serialized(): Uint8Array {
            const constructor = SetTyping.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.action.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType,
            readonly action: SendMessageActionType) {}
    
    } // class SetTyping
    } // namespace messages

    export namespace messages {
    export class SendMessage implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xfa88427a);
    
        serialized(): Uint8Array {
            const constructor = SendMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.noWebpage) ? (flags | 2) : (flags & ~2);
            flags = (this.silent) ? (flags | 32) : (flags & ~32);
            flags = (this.background) ? (flags | 64) : (flags & ~64);
            flags = (this.clearDraft) ? (flags | 128) : (flags & ~128);
            flags = (!this.replyToMsgId) ? (flags | 1) : (flags & ~1);
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            flags = (!this.entities) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            data.push(this.peer.serialized());
            if (this.replyToMsgId) data.push(this.replyToMsgId.serialized());
            data.push(this.message.serialized());
            data.push(this.randomId.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
            if (this.entities) data.push(this.entities.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly noWebpage: boolean,
            readonly silent: boolean,
            readonly background: boolean,
            readonly clearDraft: boolean,
            readonly peer: InputPeerType,
            readonly replyToMsgId: TLInt | undefined,
            readonly message: TLString,
            readonly randomId: TLLong,
            readonly replyMarkup: ReplyMarkupType | undefined,
            readonly entities: TLVector<MessageEntityType> | undefined) {}
    
    } // class SendMessage
    } // namespace messages

    export namespace messages {
    export class SendMedia implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xc8f16791);
    
        serialized(): Uint8Array {
            const constructor = SendMedia.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.silent) ? (flags | 32) : (flags & ~32);
            flags = (this.background) ? (flags | 64) : (flags & ~64);
            flags = (this.clearDraft) ? (flags | 128) : (flags & ~128);
            flags = (!this.replyToMsgId) ? (flags | 1) : (flags & ~1);
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.peer.serialized());
            if (this.replyToMsgId) data.push(this.replyToMsgId.serialized());
            data.push(this.media.serialized());
            data.push(this.randomId.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly silent: boolean,
            readonly background: boolean,
            readonly clearDraft: boolean,
            readonly peer: InputPeerType,
            readonly replyToMsgId: TLInt | undefined,
            readonly media: InputMediaType,
            readonly randomId: TLLong,
            readonly replyMarkup: ReplyMarkupType | undefined) {}
    
    } // class SendMedia
    } // namespace messages

    export namespace messages {
    export class ForwardMessages implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x708e0195);
    
        serialized(): Uint8Array {
            const constructor = ForwardMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.silent) ? (flags | 32) : (flags & ~32);
            flags = (this.background) ? (flags | 64) : (flags & ~64);
            flags = (this.withMyScore) ? (flags | 256) : (flags & ~256);
            data.push(new TLInt(flags).serialized());
            data.push(this.fromPeer.serialized());
            data.push(this.id.serialized());
            data.push(this.randomId.serialized());
            data.push(this.toPeer.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly silent: boolean,
            readonly background: boolean,
            readonly withMyScore: boolean,
            readonly fromPeer: InputPeerType,
            readonly id: TLVector<TLInt>,
            readonly randomId: TLVector<TLLong>,
            readonly toPeer: InputPeerType) {}
    
    } // class ForwardMessages
    } // namespace messages

    export namespace messages {
    export class ReportSpam implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xcf1592db);
    
        serialized(): Uint8Array {
            const constructor = ReportSpam.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType) {}
    
    } // class ReportSpam
    } // namespace messages

    export namespace messages {
    export class HideReportSpam implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xa8f1709b);
    
        serialized(): Uint8Array {
            const constructor = HideReportSpam.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType) {}
    
    } // class HideReportSpam
    } // namespace messages

    export namespace messages {
    export class GetPeerSettings implements TLFunction<PeerSettings> {
        static readonly cons = new TLInt(0x3672e09c);
    
        serialized(): Uint8Array {
            const constructor = GetPeerSettings.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType) {}
    
    } // class GetPeerSettings
    } // namespace messages

    export namespace messages {
    export class GetChats implements TLFunction<messages.Chats> {
        static readonly cons = new TLInt(0x3c6aa187);
    
        serialized(): Uint8Array {
            const constructor = GetChats.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLVector<TLInt>) {}
    
    } // class GetChats
    } // namespace messages

    export namespace messages {
    export class GetFullChat implements TLFunction<messages.ChatFull> {
        static readonly cons = new TLInt(0x3b831c66);
    
        serialized(): Uint8Array {
            const constructor = GetFullChat.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt) {}
    
    } // class GetFullChat
    } // namespace messages

    export namespace messages {
    export class EditChatTitle implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xdc452855);
    
        serialized(): Uint8Array {
            const constructor = EditChatTitle.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.title.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly title: TLString) {}
    
    } // class EditChatTitle
    } // namespace messages

    export namespace messages {
    export class EditChatPhoto implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xca4c79d8);
    
        serialized(): Uint8Array {
            const constructor = EditChatPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.photo.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly photo: InputChatPhotoType) {}
    
    } // class EditChatPhoto
    } // namespace messages

    export namespace messages {
    export class AddChatUser implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xf9a0aa09);
    
        serialized(): Uint8Array {
            const constructor = AddChatUser.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.userId.serialized());
            data.push(this.fwdLimit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly userId: InputUserType,
            readonly fwdLimit: TLInt) {}
    
    } // class AddChatUser
    } // namespace messages

    export namespace messages {
    export class DeleteChatUser implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xe0611f16);
    
        serialized(): Uint8Array {
            const constructor = DeleteChatUser.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly userId: InputUserType) {}
    
    } // class DeleteChatUser
    } // namespace messages

    export namespace messages {
    export class CreateChat implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x9cb126e);
    
        serialized(): Uint8Array {
            const constructor = CreateChat.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.users.serialized());
            data.push(this.title.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly users: TLVector<InputUserType>,
            readonly title: TLString) {}
    
    } // class CreateChat
    } // namespace messages

    export namespace messages {
    export class ForwardMessage implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x33963bf9);
    
        serialized(): Uint8Array {
            const constructor = ForwardMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.id.serialized());
            data.push(this.randomId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType,
            readonly id: TLInt,
            readonly randomId: TLLong) {}
    
    } // class ForwardMessage
    } // namespace messages

    export namespace messages {
    export class GetDhConfig implements TLFunction<messages.DhConfigType> {
        static readonly cons = new TLInt(0x26cf8950);
    
        serialized(): Uint8Array {
            const constructor = GetDhConfig.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.version.serialized());
            data.push(this.randomLength.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly version: TLInt,
            readonly randomLength: TLInt) {}
    
    } // class GetDhConfig
    } // namespace messages

    export namespace messages {
    export class RequestEncryption implements TLFunction<EncryptedChatType> {
        static readonly cons = new TLInt(0xf64daf43);
    
        serialized(): Uint8Array {
            const constructor = RequestEncryption.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.randomId.serialized());
            data.push(this.gA.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: InputUserType,
            readonly randomId: TLInt,
            readonly gA: TLBytes) {}
    
    } // class RequestEncryption
    } // namespace messages

    export namespace messages {
    export class AcceptEncryption implements TLFunction<EncryptedChatType> {
        static readonly cons = new TLInt(0x3dbc0415);
    
        serialized(): Uint8Array {
            const constructor = AcceptEncryption.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.gB.serialized());
            data.push(this.keyFingerprint.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputEncryptedChat,
            readonly gB: TLBytes,
            readonly keyFingerprint: TLLong) {}
    
    } // class AcceptEncryption
    } // namespace messages

    export namespace messages {
    export class DiscardEncryption implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xedd923c5);
    
        serialized(): Uint8Array {
            const constructor = DiscardEncryption.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt) {}
    
    } // class DiscardEncryption
    } // namespace messages

    export namespace messages {
    export class SetEncryptedTyping implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x791451ed);
    
        serialized(): Uint8Array {
            const constructor = SetEncryptedTyping.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.typing.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputEncryptedChat,
            readonly typing: BoolType) {}
    
    } // class SetEncryptedTyping
    } // namespace messages

    export namespace messages {
    export class ReadEncryptedHistory implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x7f4b690a);
    
        serialized(): Uint8Array {
            const constructor = ReadEncryptedHistory.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.maxDate.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputEncryptedChat,
            readonly maxDate: TLInt) {}
    
    } // class ReadEncryptedHistory
    } // namespace messages

    export namespace messages {
    export class SendEncrypted implements TLFunction<messages.SentEncryptedMessageType> {
        static readonly cons = new TLInt(0xa9776773);
    
        serialized(): Uint8Array {
            const constructor = SendEncrypted.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.randomId.serialized());
            data.push(this.data.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputEncryptedChat,
            readonly randomId: TLLong,
            readonly data: TLBytes) {}
    
    } // class SendEncrypted
    } // namespace messages

    export namespace messages {
    export class SendEncryptedFile implements TLFunction<messages.SentEncryptedMessageType> {
        static readonly cons = new TLInt(0x9a901b66);
    
        serialized(): Uint8Array {
            const constructor = SendEncryptedFile.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.randomId.serialized());
            data.push(this.data.serialized());
            data.push(this.file.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputEncryptedChat,
            readonly randomId: TLLong,
            readonly data: TLBytes,
            readonly file: InputEncryptedFileType) {}
    
    } // class SendEncryptedFile
    } // namespace messages

    export namespace messages {
    export class SendEncryptedService implements TLFunction<messages.SentEncryptedMessageType> {
        static readonly cons = new TLInt(0x32d439a4);
    
        serialized(): Uint8Array {
            const constructor = SendEncryptedService.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.randomId.serialized());
            data.push(this.data.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputEncryptedChat,
            readonly randomId: TLLong,
            readonly data: TLBytes) {}
    
    } // class SendEncryptedService
    } // namespace messages

    export namespace messages {
    export class ReceivedQueue implements TLFunction<TLVector<TLLong>> {
        static readonly cons = new TLInt(0x55a5bb66);
    
        serialized(): Uint8Array {
            const constructor = ReceivedQueue.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.maxQts.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly maxQts: TLInt) {}
    
    } // class ReceivedQueue
    } // namespace messages

    export namespace messages {
    export class ReadMessageContents implements TLFunction<messages.AffectedMessages> {
        static readonly cons = new TLInt(0x36a73f77);
    
        serialized(): Uint8Array {
            const constructor = ReadMessageContents.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLVector<TLInt>) {}
    
    } // class ReadMessageContents
    } // namespace messages

    export namespace messages {
    export class GetAllStickers implements TLFunction<messages.AllStickersType> {
        static readonly cons = new TLInt(0x1c9618b1);
    
        serialized(): Uint8Array {
            const constructor = GetAllStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLInt) {}
    
    } // class GetAllStickers
    } // namespace messages

    export namespace messages {
    export class GetWebPagePreview implements TLFunction<MessageMediaType> {
        static readonly cons = new TLInt(0x25223e24);
    
        serialized(): Uint8Array {
            const constructor = GetWebPagePreview.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.message.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly message: TLString) {}
    
    } // class GetWebPagePreview
    } // namespace messages

    export namespace messages {
    export class ExportChatInvite implements TLFunction<ExportedChatInviteType> {
        static readonly cons = new TLInt(0x7d885289);
    
        serialized(): Uint8Array {
            const constructor = ExportChatInvite.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt) {}
    
    } // class ExportChatInvite
    } // namespace messages

    export namespace messages {
    export class CheckChatInvite implements TLFunction<ChatInviteType> {
        static readonly cons = new TLInt(0x3eadb1bb);
    
        serialized(): Uint8Array {
            const constructor = CheckChatInvite.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLString) {}
    
    } // class CheckChatInvite
    } // namespace messages

    export namespace messages {
    export class ImportChatInvite implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x6c50051c);
    
        serialized(): Uint8Array {
            const constructor = ImportChatInvite.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLString) {}
    
    } // class ImportChatInvite
    } // namespace messages

    export namespace messages {
    export class GetStickerSet implements TLFunction<messages.StickerSet> {
        static readonly cons = new TLInt(0x2619a90e);
    
        serialized(): Uint8Array {
            const constructor = GetStickerSet.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.stickerset.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly stickerset: InputStickerSetType) {}
    
    } // class GetStickerSet
    } // namespace messages

    export namespace messages {
    export class InstallStickerSet implements TLFunction<messages.StickerSetInstallResultType> {
        static readonly cons = new TLInt(0xc78fe460);
    
        serialized(): Uint8Array {
            const constructor = InstallStickerSet.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.stickerset.serialized());
            data.push(this.archived.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly stickerset: InputStickerSetType,
            readonly archived: BoolType) {}
    
    } // class InstallStickerSet
    } // namespace messages

    export namespace messages {
    export class UninstallStickerSet implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xf96e55de);
    
        serialized(): Uint8Array {
            const constructor = UninstallStickerSet.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.stickerset.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly stickerset: InputStickerSetType) {}
    
    } // class UninstallStickerSet
    } // namespace messages

    export namespace messages {
    export class StartBot implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xe6df7378);
    
        serialized(): Uint8Array {
            const constructor = StartBot.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.bot.serialized());
            data.push(this.peer.serialized());
            data.push(this.randomId.serialized());
            data.push(this.startParam.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly bot: InputUserType,
            readonly peer: InputPeerType,
            readonly randomId: TLLong,
            readonly startParam: TLString) {}
    
    } // class StartBot
    } // namespace messages

    export namespace messages {
    export class GetMessagesViews implements TLFunction<TLVector<TLInt>> {
        static readonly cons = new TLInt(0xc4c8a55d);
    
        serialized(): Uint8Array {
            const constructor = GetMessagesViews.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.id.serialized());
            data.push(this.increment.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType,
            readonly id: TLVector<TLInt>,
            readonly increment: BoolType) {}
    
    } // class GetMessagesViews
    } // namespace messages

    export namespace messages {
    export class ToggleChatAdmins implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xec8bd9e1);
    
        serialized(): Uint8Array {
            const constructor = ToggleChatAdmins.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.enabled.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly enabled: BoolType) {}
    
    } // class ToggleChatAdmins
    } // namespace messages

    export namespace messages {
    export class EditChatAdmin implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xa9e69f2e);
    
        serialized(): Uint8Array {
            const constructor = EditChatAdmin.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
            data.push(this.userId.serialized());
            data.push(this.isAdmin.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt,
            readonly userId: InputUserType,
            readonly isAdmin: BoolType) {}
    
    } // class EditChatAdmin
    } // namespace messages

    export namespace messages {
    export class MigrateChat implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x15a3b8e3);
    
        serialized(): Uint8Array {
            const constructor = MigrateChat.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.chatId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly chatId: TLInt) {}
    
    } // class MigrateChat
    } // namespace messages

    export namespace messages {
    export class SearchGlobal implements TLFunction<messages.MessagesType> {
        static readonly cons = new TLInt(0x9e3cacb0);
    
        serialized(): Uint8Array {
            const constructor = SearchGlobal.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.q.serialized());
            data.push(this.offsetDate.serialized());
            data.push(this.offsetPeer.serialized());
            data.push(this.offsetId.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly q: TLString,
            readonly offsetDate: TLInt,
            readonly offsetPeer: InputPeerType,
            readonly offsetId: TLInt,
            readonly limit: TLInt) {}
    
    } // class SearchGlobal
    } // namespace messages

    export namespace messages {
    export class ReorderStickerSets implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x78337739);
    
        serialized(): Uint8Array {
            const constructor = ReorderStickerSets.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.masks) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.order.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly masks: boolean,
            readonly order: TLVector<TLLong>) {}
    
    } // class ReorderStickerSets
    } // namespace messages

    export namespace messages {
    export class GetDocumentByHash implements TLFunction<DocumentType> {
        static readonly cons = new TLInt(0x338e2464);
    
        serialized(): Uint8Array {
            const constructor = GetDocumentByHash.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.sha256.serialized());
            data.push(this.size.serialized());
            data.push(this.mimeType.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly sha256: TLBytes,
            readonly size: TLInt,
            readonly mimeType: TLString) {}
    
    } // class GetDocumentByHash
    } // namespace messages

    export namespace messages {
    export class SearchGifs implements TLFunction<messages.FoundGifs> {
        static readonly cons = new TLInt(0xbf9a776b);
    
        serialized(): Uint8Array {
            const constructor = SearchGifs.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.q.serialized());
            data.push(this.offset.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly q: TLString,
            readonly offset: TLInt) {}
    
    } // class SearchGifs
    } // namespace messages

    export namespace messages {
    export class GetSavedGifs implements TLFunction<messages.SavedGifsType> {
        static readonly cons = new TLInt(0x83bf3d52);
    
        serialized(): Uint8Array {
            const constructor = GetSavedGifs.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLInt) {}
    
    } // class GetSavedGifs
    } // namespace messages

    export namespace messages {
    export class SaveGif implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x327a30cb);
    
        serialized(): Uint8Array {
            const constructor = SaveGif.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.unsave.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputDocumentType,
            readonly unsave: BoolType) {}
    
    } // class SaveGif
    } // namespace messages

    export namespace messages {
    export class GetInlineBotResults implements TLFunction<messages.BotResults> {
        static readonly cons = new TLInt(0x514e999d);
    
        serialized(): Uint8Array {
            const constructor = GetInlineBotResults.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (!this.geoPoint) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.bot.serialized());
            data.push(this.peer.serialized());
            if (this.geoPoint) data.push(this.geoPoint.serialized());
            data.push(this.query.serialized());
            data.push(this.offset.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly bot: InputUserType,
            readonly peer: InputPeerType,
            readonly geoPoint: InputGeoPointType | undefined,
            readonly query: TLString,
            readonly offset: TLString) {}
    
    } // class GetInlineBotResults
    } // namespace messages

    export namespace messages {
    export class SetInlineBotResults implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xeb5ea206);
    
        serialized(): Uint8Array {
            const constructor = SetInlineBotResults.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.gallery) ? (flags | 1) : (flags & ~1);
            flags = (this.isPrivate) ? (flags | 2) : (flags & ~2);
            flags = (!this.nextOffset) ? (flags | 4) : (flags & ~4);
            flags = (!this.switchPm) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            data.push(this.queryId.serialized());
            data.push(this.results.serialized());
            data.push(this.cacheTime.serialized());
            if (this.nextOffset) data.push(this.nextOffset.serialized());
            if (this.switchPm) data.push(this.switchPm.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly gallery: boolean,
            readonly isPrivate: boolean,
            readonly queryId: TLLong,
            readonly results: TLVector<InputBotInlineResultType>,
            readonly cacheTime: TLInt,
            readonly nextOffset: TLString | undefined,
            readonly switchPm: InlineBotSwitchPM | undefined) {}
    
    } // class SetInlineBotResults
    } // namespace messages

    export namespace messages {
    export class SendInlineBotResult implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xb16e06fe);
    
        serialized(): Uint8Array {
            const constructor = SendInlineBotResult.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.silent) ? (flags | 32) : (flags & ~32);
            flags = (this.background) ? (flags | 64) : (flags & ~64);
            flags = (this.clearDraft) ? (flags | 128) : (flags & ~128);
            flags = (!this.replyToMsgId) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.peer.serialized());
            if (this.replyToMsgId) data.push(this.replyToMsgId.serialized());
            data.push(this.randomId.serialized());
            data.push(this.queryId.serialized());
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly silent: boolean,
            readonly background: boolean,
            readonly clearDraft: boolean,
            readonly peer: InputPeerType,
            readonly replyToMsgId: TLInt | undefined,
            readonly randomId: TLLong,
            readonly queryId: TLLong,
            readonly id: TLString) {}
    
    } // class SendInlineBotResult
    } // namespace messages

    export namespace messages {
    export class GetMessageEditData implements TLFunction<messages.MessageEditData> {
        static readonly cons = new TLInt(0xfda68d36);
    
        serialized(): Uint8Array {
            const constructor = GetMessageEditData.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType,
            readonly id: TLInt) {}
    
    } // class GetMessageEditData
    } // namespace messages

    export namespace messages {
    export class EditMessage implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xce91e4ca);
    
        serialized(): Uint8Array {
            const constructor = EditMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.noWebpage) ? (flags | 2) : (flags & ~2);
            flags = (!this.message) ? (flags | 2048) : (flags & ~2048);
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            flags = (!this.entities) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            data.push(this.peer.serialized());
            data.push(this.id.serialized());
            if (this.message) data.push(this.message.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
            if (this.entities) data.push(this.entities.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly noWebpage: boolean,
            readonly peer: InputPeerType,
            readonly id: TLInt,
            readonly message: TLString | undefined,
            readonly replyMarkup: ReplyMarkupType | undefined,
            readonly entities: TLVector<MessageEntityType> | undefined) {}
    
    } // class EditMessage
    } // namespace messages

    export namespace messages {
    export class EditInlineBotMessage implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x130c2c85);
    
        serialized(): Uint8Array {
            const constructor = EditInlineBotMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.noWebpage) ? (flags | 2) : (flags & ~2);
            flags = (!this.message) ? (flags | 2048) : (flags & ~2048);
            flags = (!this.replyMarkup) ? (flags | 4) : (flags & ~4);
            flags = (!this.entities) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            if (this.message) data.push(this.message.serialized());
            if (this.replyMarkup) data.push(this.replyMarkup.serialized());
            if (this.entities) data.push(this.entities.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly noWebpage: boolean,
            readonly id: InputBotInlineMessageID,
            readonly message: TLString | undefined,
            readonly replyMarkup: ReplyMarkupType | undefined,
            readonly entities: TLVector<MessageEntityType> | undefined) {}
    
    } // class EditInlineBotMessage
    } // namespace messages

    export namespace messages {
    export class GetBotCallbackAnswer implements TLFunction<messages.BotCallbackAnswer> {
        static readonly cons = new TLInt(0x810a9fec);
    
        serialized(): Uint8Array {
            const constructor = GetBotCallbackAnswer.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.game) ? (flags | 2) : (flags & ~2);
            flags = (!this.data) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.peer.serialized());
            data.push(this.msgId.serialized());
            if (this.data) data.push(this.data.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly game: boolean,
            readonly peer: InputPeerType,
            readonly msgId: TLInt,
            readonly data: TLBytes | undefined) {}
    
    } // class GetBotCallbackAnswer
    } // namespace messages

    export namespace messages {
    export class SetBotCallbackAnswer implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xc927d44b);
    
        serialized(): Uint8Array {
            const constructor = SetBotCallbackAnswer.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.alert) ? (flags | 2) : (flags & ~2);
            flags = (!this.message) ? (flags | 1) : (flags & ~1);
            flags = (!this.url) ? (flags | 4) : (flags & ~4);
            data.push(new TLInt(flags).serialized());
            data.push(this.queryId.serialized());
            if (this.message) data.push(this.message.serialized());
            if (this.url) data.push(this.url.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly alert: boolean,
            readonly queryId: TLLong,
            readonly message: TLString | undefined,
            readonly url: TLString | undefined) {}
    
    } // class SetBotCallbackAnswer
    } // namespace messages

    export namespace messages {
    export class GetPeerDialogs implements TLFunction<messages.PeerDialogs> {
        static readonly cons = new TLInt(0x2d9776b9);
    
        serialized(): Uint8Array {
            const constructor = GetPeerDialogs.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peers.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peers: TLVector<InputPeerType>) {}
    
    } // class GetPeerDialogs
    } // namespace messages

    export namespace messages {
    export class SaveDraft implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xbc39e14b);
    
        serialized(): Uint8Array {
            const constructor = SaveDraft.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.noWebpage) ? (flags | 2) : (flags & ~2);
            flags = (!this.replyToMsgId) ? (flags | 1) : (flags & ~1);
            flags = (!this.entities) ? (flags | 8) : (flags & ~8);
            data.push(new TLInt(flags).serialized());
            if (this.replyToMsgId) data.push(this.replyToMsgId.serialized());
            data.push(this.peer.serialized());
            data.push(this.message.serialized());
            if (this.entities) data.push(this.entities.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly noWebpage: boolean,
            readonly replyToMsgId: TLInt | undefined,
            readonly peer: InputPeerType,
            readonly message: TLString,
            readonly entities: TLVector<MessageEntityType> | undefined) {}
    
    } // class SaveDraft
    } // namespace messages

    export namespace messages {
    export class GetAllDrafts implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x6a3f8d65);
    
        serialized(): Uint8Array {
            const constructor = GetAllDrafts.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetAllDrafts
    } // namespace messages

    export namespace messages {
    export class GetFeaturedStickers implements TLFunction<messages.FeaturedStickersType> {
        static readonly cons = new TLInt(0x2dacca4f);
    
        serialized(): Uint8Array {
            const constructor = GetFeaturedStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLInt) {}
    
    } // class GetFeaturedStickers
    } // namespace messages

    export namespace messages {
    export class ReadFeaturedStickers implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x5b118126);
    
        serialized(): Uint8Array {
            const constructor = ReadFeaturedStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLVector<TLLong>) {}
    
    } // class ReadFeaturedStickers
    } // namespace messages

    export namespace messages {
    export class GetRecentStickers implements TLFunction<messages.RecentStickersType> {
        static readonly cons = new TLInt(0x5ea192c9);
    
        serialized(): Uint8Array {
            const constructor = GetRecentStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.attached) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly attached: boolean,
            readonly hash: TLInt) {}
    
    } // class GetRecentStickers
    } // namespace messages

    export namespace messages {
    export class SaveRecentSticker implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x392718f8);
    
        serialized(): Uint8Array {
            const constructor = SaveRecentSticker.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.attached) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.unsave.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly attached: boolean,
            readonly id: InputDocumentType,
            readonly unsave: BoolType) {}
    
    } // class SaveRecentSticker
    } // namespace messages

    export namespace messages {
    export class ClearRecentStickers implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x8999602d);
    
        serialized(): Uint8Array {
            const constructor = ClearRecentStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.attached) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly attached: boolean) {}
    
    } // class ClearRecentStickers
    } // namespace messages

    export namespace messages {
    export class GetArchivedStickers implements TLFunction<messages.ArchivedStickers> {
        static readonly cons = new TLInt(0x57f17692);
    
        serialized(): Uint8Array {
            const constructor = GetArchivedStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.masks) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.offsetId.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly masks: boolean,
            readonly offsetId: TLLong,
            readonly limit: TLInt) {}
    
    } // class GetArchivedStickers
    } // namespace messages

    export namespace messages {
    export class GetMaskStickers implements TLFunction<messages.AllStickersType> {
        static readonly cons = new TLInt(0x65b8c79f);
    
        serialized(): Uint8Array {
            const constructor = GetMaskStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.hash.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly hash: TLInt) {}
    
    } // class GetMaskStickers
    } // namespace messages

    export namespace messages {
    export class GetAttachedStickers implements TLFunction<TLVector<StickerSetCoveredType>> {
        static readonly cons = new TLInt(0xcc5b67cc);
    
        serialized(): Uint8Array {
            const constructor = GetAttachedStickers.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.media.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly media: InputStickeredMediaType) {}
    
    } // class GetAttachedStickers
    } // namespace messages

    export namespace messages {
    export class SetGameScore implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x8ef8ecc0);
    
        serialized(): Uint8Array {
            const constructor = SetGameScore.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.editMessage) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.peer.serialized());
            data.push(this.id.serialized());
            data.push(this.userId.serialized());
            data.push(this.score.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly editMessage: boolean,
            readonly peer: InputPeerType,
            readonly id: TLInt,
            readonly userId: InputUserType,
            readonly score: TLInt) {}
    
    } // class SetGameScore
    } // namespace messages

    export namespace messages {
    export class SetInlineGameScore implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x15ad9f64);
    
        serialized(): Uint8Array {
            const constructor = SetInlineGameScore.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.editMessage) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.id.serialized());
            data.push(this.userId.serialized());
            data.push(this.score.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly editMessage: boolean,
            readonly id: InputBotInlineMessageID,
            readonly userId: InputUserType,
            readonly score: TLInt) {}
    
    } // class SetInlineGameScore
    } // namespace messages

    export namespace messages {
    export class GetGameHighScores implements TLFunction<messages.HighScores> {
        static readonly cons = new TLInt(0xe822649d);
    
        serialized(): Uint8Array {
            const constructor = GetGameHighScores.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.peer.serialized());
            data.push(this.id.serialized());
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly peer: InputPeerType,
            readonly id: TLInt,
            readonly userId: InputUserType) {}
    
    } // class GetGameHighScores
    } // namespace messages

    export namespace messages {
    export class GetInlineGameHighScores implements TLFunction<messages.HighScores> {
        static readonly cons = new TLInt(0xf635e1b);
    
        serialized(): Uint8Array {
            const constructor = GetInlineGameHighScores.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputBotInlineMessageID,
            readonly userId: InputUserType) {}
    
    } // class GetInlineGameHighScores
    } // namespace messages

    export namespace updates {
    export class GetState implements TLFunction<updates.State> {
        static readonly cons = new TLInt(0xedd4882a);
    
        serialized(): Uint8Array {
            const constructor = GetState.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetState
    } // namespace updates

    export namespace updates {
    export class GetDifference implements TLFunction<updates.DifferenceType> {
        static readonly cons = new TLInt(0xa041495);
    
        serialized(): Uint8Array {
            const constructor = GetDifference.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.pts.serialized());
            data.push(this.date.serialized());
            data.push(this.qts.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly pts: TLInt,
            readonly date: TLInt,
            readonly qts: TLInt) {}
    
    } // class GetDifference
    } // namespace updates

    export namespace updates {
    export class GetChannelDifference implements TLFunction<updates.ChannelDifferenceType> {
        static readonly cons = new TLInt(0xbb32d7c0);
    
        serialized(): Uint8Array {
            const constructor = GetChannelDifference.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.filter.serialized());
            data.push(this.pts.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly filter: ChannelMessagesFilterType,
            readonly pts: TLInt,
            readonly limit: TLInt) {}
    
    } // class GetChannelDifference
    } // namespace updates

    export namespace photos {
    export class UpdateProfilePhoto implements TLFunction<UserProfilePhotoType> {
        static readonly cons = new TLInt(0xf0bb5152);
    
        serialized(): Uint8Array {
            const constructor = UpdateProfilePhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: InputPhotoType) {}
    
    } // class UpdateProfilePhoto
    } // namespace photos

    export namespace photos {
    export class UploadProfilePhoto implements TLFunction<photos.Photo> {
        static readonly cons = new TLInt(0x4f32c098);
    
        serialized(): Uint8Array {
            const constructor = UploadProfilePhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.file.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly file: InputFileType) {}
    
    } // class UploadProfilePhoto
    } // namespace photos

    export namespace photos {
    export class DeletePhotos implements TLFunction<TLVector<TLLong>> {
        static readonly cons = new TLInt(0x87cf7f2f);
    
        serialized(): Uint8Array {
            const constructor = DeletePhotos.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLVector<InputPhotoType>) {}
    
    } // class DeletePhotos
    } // namespace photos

    export namespace photos {
    export class GetUserPhotos implements TLFunction<photos.PhotosType> {
        static readonly cons = new TLInt(0x91cd32a8);
    
        serialized(): Uint8Array {
            const constructor = GetUserPhotos.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.userId.serialized());
            data.push(this.offset.serialized());
            data.push(this.maxId.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly userId: InputUserType,
            readonly offset: TLInt,
            readonly maxId: TLLong,
            readonly limit: TLInt) {}
    
    } // class GetUserPhotos
    } // namespace photos

    export namespace upload {
    export class SaveFilePart implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xb304a621);
    
        serialized(): Uint8Array {
            const constructor = SaveFilePart.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.fileId.serialized());
            data.push(this.filePart.serialized());
            data.push(this.bytes.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly fileId: TLLong,
            readonly filePart: TLInt,
            readonly bytes: TLBytes) {}
    
    } // class SaveFilePart
    } // namespace upload

    export namespace upload {
    export class GetFile implements TLFunction<upload.File> {
        static readonly cons = new TLInt(0xe3a6cfb5);
    
        serialized(): Uint8Array {
            const constructor = GetFile.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.location.serialized());
            data.push(this.offset.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly location: InputFileLocationType,
            readonly offset: TLInt,
            readonly limit: TLInt) {}
    
    } // class GetFile
    } // namespace upload

    export namespace upload {
    export class SaveBigFilePart implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xde7b673d);
    
        serialized(): Uint8Array {
            const constructor = SaveBigFilePart.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.fileId.serialized());
            data.push(this.filePart.serialized());
            data.push(this.fileTotalParts.serialized());
            data.push(this.bytes.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly fileId: TLLong,
            readonly filePart: TLInt,
            readonly fileTotalParts: TLInt,
            readonly bytes: TLBytes) {}
    
    } // class SaveBigFilePart
    } // namespace upload

    export namespace help {
    export class GetConfig implements TLFunction<Config> {
        static readonly cons = new TLInt(0xc4f9186b);
    
        serialized(): Uint8Array {
            const constructor = GetConfig.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetConfig
    } // namespace help

    export namespace help {
    export class GetNearestDc implements TLFunction<NearestDc> {
        static readonly cons = new TLInt(0x1fb33026);
    
        serialized(): Uint8Array {
            const constructor = GetNearestDc.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetNearestDc
    } // namespace help

    export namespace help {
    export class GetAppUpdate implements TLFunction<help.AppUpdateType> {
        static readonly cons = new TLInt(0xae2de196);
    
        serialized(): Uint8Array {
            const constructor = GetAppUpdate.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetAppUpdate
    } // namespace help

    export namespace help {
    export class SaveAppLog implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x6f02f748);
    
        serialized(): Uint8Array {
            const constructor = SaveAppLog.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.events.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly events: TLVector<InputAppEvent>) {}
    
    } // class SaveAppLog
    } // namespace help

    export namespace help {
    export class GetInviteText implements TLFunction<help.InviteText> {
        static readonly cons = new TLInt(0x4d392343);
    
        serialized(): Uint8Array {
            const constructor = GetInviteText.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetInviteText
    } // namespace help

    export namespace help {
    export class GetSupport implements TLFunction<help.Support> {
        static readonly cons = new TLInt(0x9cdf08cd);
    
        serialized(): Uint8Array {
            const constructor = GetSupport.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetSupport
    } // namespace help

    export namespace help {
    export class GetAppChangelog implements TLFunction<help.AppChangelogType> {
        static readonly cons = new TLInt(0xb921197a);
    
        serialized(): Uint8Array {
            const constructor = GetAppChangelog.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetAppChangelog
    } // namespace help

    export namespace help {
    export class GetTermsOfService implements TLFunction<help.TermsOfService> {
        static readonly cons = new TLInt(0x350170f3);
    
        serialized(): Uint8Array {
            const constructor = GetTermsOfService.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetTermsOfService
    } // namespace help

    export namespace channels {
    export class ReadHistory implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xcc104937);
    
        serialized(): Uint8Array {
            const constructor = ReadHistory.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.maxId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly maxId: TLInt) {}
    
    } // class ReadHistory
    } // namespace channels

    export namespace channels {
    export class DeleteMessages implements TLFunction<messages.AffectedMessages> {
        static readonly cons = new TLInt(0x84c1fd4e);
    
        serialized(): Uint8Array {
            const constructor = DeleteMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly id: TLVector<TLInt>) {}
    
    } // class DeleteMessages
    } // namespace channels

    export namespace channels {
    export class DeleteUserHistory implements TLFunction<messages.AffectedHistory> {
        static readonly cons = new TLInt(0xd10dd71b);
    
        serialized(): Uint8Array {
            const constructor = DeleteUserHistory.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly userId: InputUserType) {}
    
    } // class DeleteUserHistory
    } // namespace channels

    export namespace channels {
    export class ReportSpam implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0xfe087810);
    
        serialized(): Uint8Array {
            const constructor = ReportSpam.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.userId.serialized());
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly userId: InputUserType,
            readonly id: TLVector<TLInt>) {}
    
    } // class ReportSpam
    } // namespace channels

    export namespace channels {
    export class GetMessages implements TLFunction<messages.MessagesType> {
        static readonly cons = new TLInt(0x93d7b347);
    
        serialized(): Uint8Array {
            const constructor = GetMessages.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly id: TLVector<TLInt>) {}
    
    } // class GetMessages
    } // namespace channels

    export namespace channels {
    export class GetParticipants implements TLFunction<channels.ChannelParticipants> {
        static readonly cons = new TLInt(0x24d98f92);
    
        serialized(): Uint8Array {
            const constructor = GetParticipants.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.filter.serialized());
            data.push(this.offset.serialized());
            data.push(this.limit.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly filter: ChannelParticipantsFilterType,
            readonly offset: TLInt,
            readonly limit: TLInt) {}
    
    } // class GetParticipants
    } // namespace channels

    export namespace channels {
    export class GetParticipant implements TLFunction<channels.ChannelParticipant> {
        static readonly cons = new TLInt(0x546dd7a6);
    
        serialized(): Uint8Array {
            const constructor = GetParticipant.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.userId.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly userId: InputUserType) {}
    
    } // class GetParticipant
    } // namespace channels

    export namespace channels {
    export class GetChannels implements TLFunction<messages.Chats> {
        static readonly cons = new TLInt(0xa7f6bbb);
    
        serialized(): Uint8Array {
            const constructor = GetChannels.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly id: TLVector<InputChannelType>) {}
    
    } // class GetChannels
    } // namespace channels

    export namespace channels {
    export class GetFullChannel implements TLFunction<messages.ChatFull> {
        static readonly cons = new TLInt(0x8736a09);
    
        serialized(): Uint8Array {
            const constructor = GetFullChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType) {}
    
    } // class GetFullChannel
    } // namespace channels

    export namespace channels {
    export class CreateChannel implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xf4893d7f);
    
        serialized(): Uint8Array {
            const constructor = CreateChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.broadcast) ? (flags | 1) : (flags & ~1);
            flags = (this.megagroup) ? (flags | 2) : (flags & ~2);
            data.push(new TLInt(flags).serialized());
            data.push(this.title.serialized());
            data.push(this.about.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly broadcast: boolean,
            readonly megagroup: boolean,
            readonly title: TLString,
            readonly about: TLString) {}
    
    } // class CreateChannel
    } // namespace channels

    export namespace channels {
    export class EditAbout implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x13e27f1e);
    
        serialized(): Uint8Array {
            const constructor = EditAbout.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.about.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly about: TLString) {}
    
    } // class EditAbout
    } // namespace channels

    export namespace channels {
    export class EditAdmin implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xeb7611d0);
    
        serialized(): Uint8Array {
            const constructor = EditAdmin.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.userId.serialized());
            data.push(this.role.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly userId: InputUserType,
            readonly role: ChannelParticipantRoleType) {}
    
    } // class EditAdmin
    } // namespace channels

    export namespace channels {
    export class EditTitle implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x566decd0);
    
        serialized(): Uint8Array {
            const constructor = EditTitle.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.title.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly title: TLString) {}
    
    } // class EditTitle
    } // namespace channels

    export namespace channels {
    export class EditPhoto implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xf12e57c9);
    
        serialized(): Uint8Array {
            const constructor = EditPhoto.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.photo.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly photo: InputChatPhotoType) {}
    
    } // class EditPhoto
    } // namespace channels

    export namespace channels {
    export class CheckUsername implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x10e6bd2c);
    
        serialized(): Uint8Array {
            const constructor = CheckUsername.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.username.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly username: TLString) {}
    
    } // class CheckUsername
    } // namespace channels

    export namespace channels {
    export class UpdateUsername implements TLFunction<BoolType> {
        static readonly cons = new TLInt(0x3514b3de);
    
        serialized(): Uint8Array {
            const constructor = UpdateUsername.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.username.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly username: TLString) {}
    
    } // class UpdateUsername
    } // namespace channels

    export namespace channels {
    export class JoinChannel implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x24b524c5);
    
        serialized(): Uint8Array {
            const constructor = JoinChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType) {}
    
    } // class JoinChannel
    } // namespace channels

    export namespace channels {
    export class LeaveChannel implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xf836aa95);
    
        serialized(): Uint8Array {
            const constructor = LeaveChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType) {}
    
    } // class LeaveChannel
    } // namespace channels

    export namespace channels {
    export class InviteToChannel implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x199f3a6c);
    
        serialized(): Uint8Array {
            const constructor = InviteToChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.users.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly users: TLVector<InputUserType>) {}
    
    } // class InviteToChannel
    } // namespace channels

    export namespace channels {
    export class KickFromChannel implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xa672de14);
    
        serialized(): Uint8Array {
            const constructor = KickFromChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.userId.serialized());
            data.push(this.kicked.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly userId: InputUserType,
            readonly kicked: BoolType) {}
    
    } // class KickFromChannel
    } // namespace channels

    export namespace channels {
    export class ExportInvite implements TLFunction<ExportedChatInviteType> {
        static readonly cons = new TLInt(0xc7560885);
    
        serialized(): Uint8Array {
            const constructor = ExportInvite.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType) {}
    
    } // class ExportInvite
    } // namespace channels

    export namespace channels {
    export class DeleteChannel implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xc0111fe3);
    
        serialized(): Uint8Array {
            const constructor = DeleteChannel.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType) {}
    
    } // class DeleteChannel
    } // namespace channels

    export namespace channels {
    export class ToggleInvites implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x49609307);
    
        serialized(): Uint8Array {
            const constructor = ToggleInvites.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.enabled.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly enabled: BoolType) {}
    
    } // class ToggleInvites
    } // namespace channels

    export namespace channels {
    export class ExportMessageLink implements TLFunction<ExportedMessageLink> {
        static readonly cons = new TLInt(0xc846d22d);
    
        serialized(): Uint8Array {
            const constructor = ExportMessageLink.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly id: TLInt) {}
    
    } // class ExportMessageLink
    } // namespace channels

    export namespace channels {
    export class ToggleSignatures implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0x1f69b606);
    
        serialized(): Uint8Array {
            const constructor = ToggleSignatures.cons.serialized();
            const data: Uint8Array[] = [constructor];
            data.push(this.channel.serialized());
            data.push(this.enabled.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly channel: InputChannelType,
            readonly enabled: BoolType) {}
    
    } // class ToggleSignatures
    } // namespace channels

    export namespace channels {
    export class UpdatePinnedMessage implements TLFunction<UpdatesType> {
        static readonly cons = new TLInt(0xa72ded52);
    
        serialized(): Uint8Array {
            const constructor = UpdatePinnedMessage.cons.serialized();
            const data: Uint8Array[] = [constructor];
            let flags = 0;
            flags = (this.silent) ? (flags | 1) : (flags & ~1);
            data.push(new TLInt(flags).serialized());
            data.push(this.channel.serialized());
            data.push(this.id.serialized());
    
            return concat(...data);
        }
    
        constructor(
            readonly silent: boolean,
            readonly channel: InputChannelType,
            readonly id: TLInt) {}
    
    } // class UpdatePinnedMessage
    } // namespace channels

    export namespace channels {
    export class GetAdminedPublicChannels implements TLFunction<messages.Chats> {
        static readonly cons = new TLInt(0x8d8d82d7);
    
        serialized(): Uint8Array {
            const constructor = GetAdminedPublicChannels.cons.serialized();
            const data: Uint8Array[] = [constructor];
    
            return concat(...data);
        }
    
    } // class GetAdminedPublicChannels
    } // namespace channels

    export const constructables = ((): HashMap<TLInt, any> => {
        const map = new HashMap<TLInt, any>();
    
        map.put(BoolFalse.cons, BoolFalse);
        map.put(BoolTrue.cons, BoolTrue);
        map.put(InputPeerEmpty.cons, InputPeerEmpty);
        map.put(InputPeerSelf.cons, InputPeerSelf);
        map.put(InputPeerChat.cons, InputPeerChat);
        map.put(InputPeerUser.cons, InputPeerUser);
        map.put(InputPeerChannel.cons, InputPeerChannel);
        map.put(InputUserEmpty.cons, InputUserEmpty);
        map.put(InputUserSelf.cons, InputUserSelf);
        map.put(InputUser.cons, InputUser);
        map.put(InputPhoneContact.cons, InputPhoneContact);
        map.put(InputFile.cons, InputFile);
        map.put(InputFileBig.cons, InputFileBig);
        map.put(InputMediaEmpty.cons, InputMediaEmpty);
        map.put(InputMediaUploadedPhoto.cons, InputMediaUploadedPhoto);
        map.put(InputMediaPhoto.cons, InputMediaPhoto);
        map.put(InputMediaGeoPoint.cons, InputMediaGeoPoint);
        map.put(InputMediaContact.cons, InputMediaContact);
        map.put(InputMediaUploadedDocument.cons, InputMediaUploadedDocument);
        map.put(InputMediaUploadedThumbDocument.cons, InputMediaUploadedThumbDocument);
        map.put(InputMediaDocument.cons, InputMediaDocument);
        map.put(InputMediaVenue.cons, InputMediaVenue);
        map.put(InputMediaGifExternal.cons, InputMediaGifExternal);
        map.put(InputMediaPhotoExternal.cons, InputMediaPhotoExternal);
        map.put(InputMediaDocumentExternal.cons, InputMediaDocumentExternal);
        map.put(InputMediaGame.cons, InputMediaGame);
        map.put(InputChatPhotoEmpty.cons, InputChatPhotoEmpty);
        map.put(InputChatUploadedPhoto.cons, InputChatUploadedPhoto);
        map.put(InputChatPhoto.cons, InputChatPhoto);
        map.put(InputGeoPointEmpty.cons, InputGeoPointEmpty);
        map.put(InputGeoPoint.cons, InputGeoPoint);
        map.put(InputPhotoEmpty.cons, InputPhotoEmpty);
        map.put(InputPhoto.cons, InputPhoto);
        map.put(InputFileLocation.cons, InputFileLocation);
        map.put(InputEncryptedFileLocation.cons, InputEncryptedFileLocation);
        map.put(InputDocumentFileLocation.cons, InputDocumentFileLocation);
        map.put(InputAppEvent.cons, InputAppEvent);
        map.put(PeerUser.cons, PeerUser);
        map.put(PeerChat.cons, PeerChat);
        map.put(PeerChannel.cons, PeerChannel);
        map.put(storage.FileUnknown.cons, storage.FileUnknown);
        map.put(storage.FileJpeg.cons, storage.FileJpeg);
        map.put(storage.FileGif.cons, storage.FileGif);
        map.put(storage.FilePng.cons, storage.FilePng);
        map.put(storage.FilePdf.cons, storage.FilePdf);
        map.put(storage.FileMp3.cons, storage.FileMp3);
        map.put(storage.FileMov.cons, storage.FileMov);
        map.put(storage.FilePartial.cons, storage.FilePartial);
        map.put(storage.FileMp4.cons, storage.FileMp4);
        map.put(storage.FileWebp.cons, storage.FileWebp);
        map.put(FileLocationUnavailable.cons, FileLocationUnavailable);
        map.put(FileLocation.cons, FileLocation);
        map.put(UserEmpty.cons, UserEmpty);
        map.put(User.cons, User);
        map.put(UserProfilePhotoEmpty.cons, UserProfilePhotoEmpty);
        map.put(UserProfilePhoto.cons, UserProfilePhoto);
        map.put(UserStatusEmpty.cons, UserStatusEmpty);
        map.put(UserStatusOnline.cons, UserStatusOnline);
        map.put(UserStatusOffline.cons, UserStatusOffline);
        map.put(UserStatusRecently.cons, UserStatusRecently);
        map.put(UserStatusLastWeek.cons, UserStatusLastWeek);
        map.put(UserStatusLastMonth.cons, UserStatusLastMonth);
        map.put(ChatEmpty.cons, ChatEmpty);
        map.put(Chat.cons, Chat);
        map.put(ChatForbidden.cons, ChatForbidden);
        map.put(Channel.cons, Channel);
        map.put(ChannelForbidden.cons, ChannelForbidden);
        map.put(ChatFull.cons, ChatFull);
        map.put(ChannelFull.cons, ChannelFull);
        map.put(ChatParticipant.cons, ChatParticipant);
        map.put(ChatParticipantCreator.cons, ChatParticipantCreator);
        map.put(ChatParticipantAdmin.cons, ChatParticipantAdmin);
        map.put(ChatParticipantsForbidden.cons, ChatParticipantsForbidden);
        map.put(ChatParticipants.cons, ChatParticipants);
        map.put(ChatPhotoEmpty.cons, ChatPhotoEmpty);
        map.put(ChatPhoto.cons, ChatPhoto);
        map.put(MessageEmpty.cons, MessageEmpty);
        map.put(Message.cons, Message);
        map.put(MessageService.cons, MessageService);
        map.put(MessageMediaEmpty.cons, MessageMediaEmpty);
        map.put(MessageMediaPhoto.cons, MessageMediaPhoto);
        map.put(MessageMediaGeo.cons, MessageMediaGeo);
        map.put(MessageMediaContact.cons, MessageMediaContact);
        map.put(MessageMediaUnsupported.cons, MessageMediaUnsupported);
        map.put(MessageMediaDocument.cons, MessageMediaDocument);
        map.put(MessageMediaWebPage.cons, MessageMediaWebPage);
        map.put(MessageMediaVenue.cons, MessageMediaVenue);
        map.put(MessageMediaGame.cons, MessageMediaGame);
        map.put(MessageActionEmpty.cons, MessageActionEmpty);
        map.put(MessageActionChatCreate.cons, MessageActionChatCreate);
        map.put(MessageActionChatEditTitle.cons, MessageActionChatEditTitle);
        map.put(MessageActionChatEditPhoto.cons, MessageActionChatEditPhoto);
        map.put(MessageActionChatDeletePhoto.cons, MessageActionChatDeletePhoto);
        map.put(MessageActionChatAddUser.cons, MessageActionChatAddUser);
        map.put(MessageActionChatDeleteUser.cons, MessageActionChatDeleteUser);
        map.put(MessageActionChatJoinedByLink.cons, MessageActionChatJoinedByLink);
        map.put(MessageActionChannelCreate.cons, MessageActionChannelCreate);
        map.put(MessageActionChatMigrateTo.cons, MessageActionChatMigrateTo);
        map.put(MessageActionChannelMigrateFrom.cons, MessageActionChannelMigrateFrom);
        map.put(MessageActionPinMessage.cons, MessageActionPinMessage);
        map.put(MessageActionHistoryClear.cons, MessageActionHistoryClear);
        map.put(MessageActionGameScore.cons, MessageActionGameScore);
        map.put(Dialog.cons, Dialog);
        map.put(PhotoEmpty.cons, PhotoEmpty);
        map.put(Photo.cons, Photo);
        map.put(PhotoSizeEmpty.cons, PhotoSizeEmpty);
        map.put(PhotoSize.cons, PhotoSize);
        map.put(PhotoCachedSize.cons, PhotoCachedSize);
        map.put(GeoPointEmpty.cons, GeoPointEmpty);
        map.put(GeoPoint.cons, GeoPoint);
        map.put(auth.CheckedPhone.cons, auth.CheckedPhone);
        map.put(auth.SentCode.cons, auth.SentCode);
        map.put(auth.Authorization.cons, auth.Authorization);
        map.put(auth.ExportedAuthorization.cons, auth.ExportedAuthorization);
        map.put(InputNotifyPeer.cons, InputNotifyPeer);
        map.put(InputNotifyUsers.cons, InputNotifyUsers);
        map.put(InputNotifyChats.cons, InputNotifyChats);
        map.put(InputNotifyAll.cons, InputNotifyAll);
        map.put(InputPeerNotifyEventsEmpty.cons, InputPeerNotifyEventsEmpty);
        map.put(InputPeerNotifyEventsAll.cons, InputPeerNotifyEventsAll);
        map.put(InputPeerNotifySettings.cons, InputPeerNotifySettings);
        map.put(PeerNotifyEventsEmpty.cons, PeerNotifyEventsEmpty);
        map.put(PeerNotifyEventsAll.cons, PeerNotifyEventsAll);
        map.put(PeerNotifySettingsEmpty.cons, PeerNotifySettingsEmpty);
        map.put(PeerNotifySettings.cons, PeerNotifySettings);
        map.put(PeerSettings.cons, PeerSettings);
        map.put(WallPaper.cons, WallPaper);
        map.put(WallPaperSolid.cons, WallPaperSolid);
        map.put(InputReportReasonSpam.cons, InputReportReasonSpam);
        map.put(InputReportReasonViolence.cons, InputReportReasonViolence);
        map.put(InputReportReasonPornography.cons, InputReportReasonPornography);
        map.put(InputReportReasonOther.cons, InputReportReasonOther);
        map.put(UserFull.cons, UserFull);
        map.put(Contact.cons, Contact);
        map.put(ImportedContact.cons, ImportedContact);
        map.put(ContactBlocked.cons, ContactBlocked);
        map.put(ContactStatus.cons, ContactStatus);
        map.put(contacts.Link.cons, contacts.Link);
        map.put(contacts.ContactsNotModified.cons, contacts.ContactsNotModified);
        map.put(contacts.Contacts.cons, contacts.Contacts);
        map.put(contacts.ImportedContacts.cons, contacts.ImportedContacts);
        map.put(contacts.Blocked.cons, contacts.Blocked);
        map.put(contacts.BlockedSlice.cons, contacts.BlockedSlice);
        map.put(messages.Dialogs.cons, messages.Dialogs);
        map.put(messages.DialogsSlice.cons, messages.DialogsSlice);
        map.put(messages.Messages.cons, messages.Messages);
        map.put(messages.MessagesSlice.cons, messages.MessagesSlice);
        map.put(messages.ChannelMessages.cons, messages.ChannelMessages);
        map.put(messages.Chats.cons, messages.Chats);
        map.put(messages.ChatFull.cons, messages.ChatFull);
        map.put(messages.AffectedHistory.cons, messages.AffectedHistory);
        map.put(InputMessagesFilterEmpty.cons, InputMessagesFilterEmpty);
        map.put(InputMessagesFilterPhotos.cons, InputMessagesFilterPhotos);
        map.put(InputMessagesFilterVideo.cons, InputMessagesFilterVideo);
        map.put(InputMessagesFilterPhotoVideo.cons, InputMessagesFilterPhotoVideo);
        map.put(InputMessagesFilterPhotoVideoDocuments.cons, InputMessagesFilterPhotoVideoDocuments);
        map.put(InputMessagesFilterDocument.cons, InputMessagesFilterDocument);
        map.put(InputMessagesFilterUrl.cons, InputMessagesFilterUrl);
        map.put(InputMessagesFilterGif.cons, InputMessagesFilterGif);
        map.put(InputMessagesFilterVoice.cons, InputMessagesFilterVoice);
        map.put(InputMessagesFilterMusic.cons, InputMessagesFilterMusic);
        map.put(InputMessagesFilterChatPhotos.cons, InputMessagesFilterChatPhotos);
        map.put(UpdateNewMessage.cons, UpdateNewMessage);
        map.put(UpdateMessageID.cons, UpdateMessageID);
        map.put(UpdateDeleteMessages.cons, UpdateDeleteMessages);
        map.put(UpdateUserTyping.cons, UpdateUserTyping);
        map.put(UpdateChatUserTyping.cons, UpdateChatUserTyping);
        map.put(UpdateChatParticipants.cons, UpdateChatParticipants);
        map.put(UpdateUserStatus.cons, UpdateUserStatus);
        map.put(UpdateUserName.cons, UpdateUserName);
        map.put(UpdateUserPhoto.cons, UpdateUserPhoto);
        map.put(UpdateContactRegistered.cons, UpdateContactRegistered);
        map.put(UpdateContactLink.cons, UpdateContactLink);
        map.put(UpdateNewAuthorization.cons, UpdateNewAuthorization);
        map.put(UpdateNewEncryptedMessage.cons, UpdateNewEncryptedMessage);
        map.put(UpdateEncryptedChatTyping.cons, UpdateEncryptedChatTyping);
        map.put(UpdateEncryption.cons, UpdateEncryption);
        map.put(UpdateEncryptedMessagesRead.cons, UpdateEncryptedMessagesRead);
        map.put(UpdateChatParticipantAdd.cons, UpdateChatParticipantAdd);
        map.put(UpdateChatParticipantDelete.cons, UpdateChatParticipantDelete);
        map.put(UpdateDcOptions.cons, UpdateDcOptions);
        map.put(UpdateUserBlocked.cons, UpdateUserBlocked);
        map.put(UpdateNotifySettings.cons, UpdateNotifySettings);
        map.put(UpdateServiceNotification.cons, UpdateServiceNotification);
        map.put(UpdatePrivacy.cons, UpdatePrivacy);
        map.put(UpdateUserPhone.cons, UpdateUserPhone);
        map.put(UpdateReadHistoryInbox.cons, UpdateReadHistoryInbox);
        map.put(UpdateReadHistoryOutbox.cons, UpdateReadHistoryOutbox);
        map.put(UpdateWebPage.cons, UpdateWebPage);
        map.put(UpdateReadMessagesContents.cons, UpdateReadMessagesContents);
        map.put(UpdateChannelTooLong.cons, UpdateChannelTooLong);
        map.put(UpdateChannel.cons, UpdateChannel);
        map.put(UpdateNewChannelMessage.cons, UpdateNewChannelMessage);
        map.put(UpdateReadChannelInbox.cons, UpdateReadChannelInbox);
        map.put(UpdateDeleteChannelMessages.cons, UpdateDeleteChannelMessages);
        map.put(UpdateChannelMessageViews.cons, UpdateChannelMessageViews);
        map.put(UpdateChatAdmins.cons, UpdateChatAdmins);
        map.put(UpdateChatParticipantAdmin.cons, UpdateChatParticipantAdmin);
        map.put(UpdateNewStickerSet.cons, UpdateNewStickerSet);
        map.put(UpdateStickerSetsOrder.cons, UpdateStickerSetsOrder);
        map.put(UpdateStickerSets.cons, UpdateStickerSets);
        map.put(UpdateSavedGifs.cons, UpdateSavedGifs);
        map.put(UpdateBotInlineQuery.cons, UpdateBotInlineQuery);
        map.put(UpdateBotInlineSend.cons, UpdateBotInlineSend);
        map.put(UpdateEditChannelMessage.cons, UpdateEditChannelMessage);
        map.put(UpdateChannelPinnedMessage.cons, UpdateChannelPinnedMessage);
        map.put(UpdateBotCallbackQuery.cons, UpdateBotCallbackQuery);
        map.put(UpdateEditMessage.cons, UpdateEditMessage);
        map.put(UpdateInlineBotCallbackQuery.cons, UpdateInlineBotCallbackQuery);
        map.put(UpdateReadChannelOutbox.cons, UpdateReadChannelOutbox);
        map.put(UpdateDraftMessage.cons, UpdateDraftMessage);
        map.put(UpdateReadFeaturedStickers.cons, UpdateReadFeaturedStickers);
        map.put(UpdateRecentStickers.cons, UpdateRecentStickers);
        map.put(UpdateConfig.cons, UpdateConfig);
        map.put(UpdatePtsChanged.cons, UpdatePtsChanged);
        map.put(updates.State.cons, updates.State);
        map.put(updates.DifferenceEmpty.cons, updates.DifferenceEmpty);
        map.put(updates.Difference.cons, updates.Difference);
        map.put(updates.DifferenceSlice.cons, updates.DifferenceSlice);
        map.put(UpdatesTooLong.cons, UpdatesTooLong);
        map.put(UpdateShortMessage.cons, UpdateShortMessage);
        map.put(UpdateShortChatMessage.cons, UpdateShortChatMessage);
        map.put(UpdateShort.cons, UpdateShort);
        map.put(UpdatesCombined.cons, UpdatesCombined);
        map.put(Updates.cons, Updates);
        map.put(UpdateShortSentMessage.cons, UpdateShortSentMessage);
        map.put(photos.Photos.cons, photos.Photos);
        map.put(photos.PhotosSlice.cons, photos.PhotosSlice);
        map.put(photos.Photo.cons, photos.Photo);
        map.put(upload.File.cons, upload.File);
        map.put(DcOption.cons, DcOption);
        map.put(Config.cons, Config);
        map.put(NearestDc.cons, NearestDc);
        map.put(help.AppUpdate.cons, help.AppUpdate);
        map.put(help.NoAppUpdate.cons, help.NoAppUpdate);
        map.put(help.InviteText.cons, help.InviteText);
        map.put(EncryptedChatEmpty.cons, EncryptedChatEmpty);
        map.put(EncryptedChatWaiting.cons, EncryptedChatWaiting);
        map.put(EncryptedChatRequested.cons, EncryptedChatRequested);
        map.put(EncryptedChat.cons, EncryptedChat);
        map.put(EncryptedChatDiscarded.cons, EncryptedChatDiscarded);
        map.put(InputEncryptedChat.cons, InputEncryptedChat);
        map.put(EncryptedFileEmpty.cons, EncryptedFileEmpty);
        map.put(EncryptedFile.cons, EncryptedFile);
        map.put(InputEncryptedFileEmpty.cons, InputEncryptedFileEmpty);
        map.put(InputEncryptedFileUploaded.cons, InputEncryptedFileUploaded);
        map.put(InputEncryptedFile.cons, InputEncryptedFile);
        map.put(InputEncryptedFileBigUploaded.cons, InputEncryptedFileBigUploaded);
        map.put(EncryptedMessage.cons, EncryptedMessage);
        map.put(EncryptedMessageService.cons, EncryptedMessageService);
        map.put(messages.DhConfigNotModified.cons, messages.DhConfigNotModified);
        map.put(messages.DhConfig.cons, messages.DhConfig);
        map.put(messages.SentEncryptedMessage.cons, messages.SentEncryptedMessage);
        map.put(messages.SentEncryptedFile.cons, messages.SentEncryptedFile);
        map.put(InputDocumentEmpty.cons, InputDocumentEmpty);
        map.put(InputDocument.cons, InputDocument);
        map.put(DocumentEmpty.cons, DocumentEmpty);
        map.put(Document.cons, Document);
        map.put(help.Support.cons, help.Support);
        map.put(NotifyPeer.cons, NotifyPeer);
        map.put(NotifyUsers.cons, NotifyUsers);
        map.put(NotifyChats.cons, NotifyChats);
        map.put(NotifyAll.cons, NotifyAll);
        map.put(SendMessageTypingAction.cons, SendMessageTypingAction);
        map.put(SendMessageCancelAction.cons, SendMessageCancelAction);
        map.put(SendMessageRecordVideoAction.cons, SendMessageRecordVideoAction);
        map.put(SendMessageUploadVideoAction.cons, SendMessageUploadVideoAction);
        map.put(SendMessageRecordAudioAction.cons, SendMessageRecordAudioAction);
        map.put(SendMessageUploadAudioAction.cons, SendMessageUploadAudioAction);
        map.put(SendMessageUploadPhotoAction.cons, SendMessageUploadPhotoAction);
        map.put(SendMessageUploadDocumentAction.cons, SendMessageUploadDocumentAction);
        map.put(SendMessageGeoLocationAction.cons, SendMessageGeoLocationAction);
        map.put(SendMessageChooseContactAction.cons, SendMessageChooseContactAction);
        map.put(SendMessageGamePlayAction.cons, SendMessageGamePlayAction);
        map.put(contacts.Found.cons, contacts.Found);
        map.put(InputPrivacyKeyStatusTimestamp.cons, InputPrivacyKeyStatusTimestamp);
        map.put(InputPrivacyKeyChatInvite.cons, InputPrivacyKeyChatInvite);
        map.put(PrivacyKeyStatusTimestamp.cons, PrivacyKeyStatusTimestamp);
        map.put(PrivacyKeyChatInvite.cons, PrivacyKeyChatInvite);
        map.put(InputPrivacyValueAllowContacts.cons, InputPrivacyValueAllowContacts);
        map.put(InputPrivacyValueAllowAll.cons, InputPrivacyValueAllowAll);
        map.put(InputPrivacyValueAllowUsers.cons, InputPrivacyValueAllowUsers);
        map.put(InputPrivacyValueDisallowContacts.cons, InputPrivacyValueDisallowContacts);
        map.put(InputPrivacyValueDisallowAll.cons, InputPrivacyValueDisallowAll);
        map.put(InputPrivacyValueDisallowUsers.cons, InputPrivacyValueDisallowUsers);
        map.put(PrivacyValueAllowContacts.cons, PrivacyValueAllowContacts);
        map.put(PrivacyValueAllowAll.cons, PrivacyValueAllowAll);
        map.put(PrivacyValueAllowUsers.cons, PrivacyValueAllowUsers);
        map.put(PrivacyValueDisallowContacts.cons, PrivacyValueDisallowContacts);
        map.put(PrivacyValueDisallowAll.cons, PrivacyValueDisallowAll);
        map.put(PrivacyValueDisallowUsers.cons, PrivacyValueDisallowUsers);
        map.put(account.PrivacyRules.cons, account.PrivacyRules);
        map.put(AccountDaysTTL.cons, AccountDaysTTL);
        map.put(DocumentAttributeImageSize.cons, DocumentAttributeImageSize);
        map.put(DocumentAttributeAnimated.cons, DocumentAttributeAnimated);
        map.put(DocumentAttributeSticker.cons, DocumentAttributeSticker);
        map.put(DocumentAttributeVideo.cons, DocumentAttributeVideo);
        map.put(DocumentAttributeAudio.cons, DocumentAttributeAudio);
        map.put(DocumentAttributeFilename.cons, DocumentAttributeFilename);
        map.put(DocumentAttributeHasStickers.cons, DocumentAttributeHasStickers);
        map.put(messages.StickersNotModified.cons, messages.StickersNotModified);
        map.put(messages.Stickers.cons, messages.Stickers);
        map.put(StickerPack.cons, StickerPack);
        map.put(messages.AllStickersNotModified.cons, messages.AllStickersNotModified);
        map.put(messages.AllStickers.cons, messages.AllStickers);
        map.put(DisabledFeature.cons, DisabledFeature);
        map.put(messages.AffectedMessages.cons, messages.AffectedMessages);
        map.put(ContactLinkUnknown.cons, ContactLinkUnknown);
        map.put(ContactLinkNone.cons, ContactLinkNone);
        map.put(ContactLinkHasPhone.cons, ContactLinkHasPhone);
        map.put(ContactLinkContact.cons, ContactLinkContact);
        map.put(WebPageEmpty.cons, WebPageEmpty);
        map.put(WebPagePending.cons, WebPagePending);
        map.put(WebPage.cons, WebPage);
        map.put(Authorization.cons, Authorization);
        map.put(account.Authorizations.cons, account.Authorizations);
        map.put(account.NoPassword.cons, account.NoPassword);
        map.put(account.Password.cons, account.Password);
        map.put(account.PasswordSettings.cons, account.PasswordSettings);
        map.put(account.PasswordInputSettings.cons, account.PasswordInputSettings);
        map.put(auth.PasswordRecovery.cons, auth.PasswordRecovery);
        map.put(ReceivedNotifyMessage.cons, ReceivedNotifyMessage);
        map.put(ChatInviteEmpty.cons, ChatInviteEmpty);
        map.put(ChatInviteExported.cons, ChatInviteExported);
        map.put(ChatInviteAlready.cons, ChatInviteAlready);
        map.put(ChatInvite.cons, ChatInvite);
        map.put(InputStickerSetEmpty.cons, InputStickerSetEmpty);
        map.put(InputStickerSetID.cons, InputStickerSetID);
        map.put(InputStickerSetShortName.cons, InputStickerSetShortName);
        map.put(StickerSet.cons, StickerSet);
        map.put(messages.StickerSet.cons, messages.StickerSet);
        map.put(BotCommand.cons, BotCommand);
        map.put(BotInfo.cons, BotInfo);
        map.put(KeyboardButton.cons, KeyboardButton);
        map.put(KeyboardButtonUrl.cons, KeyboardButtonUrl);
        map.put(KeyboardButtonCallback.cons, KeyboardButtonCallback);
        map.put(KeyboardButtonRequestPhone.cons, KeyboardButtonRequestPhone);
        map.put(KeyboardButtonRequestGeoLocation.cons, KeyboardButtonRequestGeoLocation);
        map.put(KeyboardButtonSwitchInline.cons, KeyboardButtonSwitchInline);
        map.put(KeyboardButtonGame.cons, KeyboardButtonGame);
        map.put(KeyboardButtonRow.cons, KeyboardButtonRow);
        map.put(ReplyKeyboardHide.cons, ReplyKeyboardHide);
        map.put(ReplyKeyboardForceReply.cons, ReplyKeyboardForceReply);
        map.put(ReplyKeyboardMarkup.cons, ReplyKeyboardMarkup);
        map.put(ReplyInlineMarkup.cons, ReplyInlineMarkup);
        map.put(help.AppChangelogEmpty.cons, help.AppChangelogEmpty);
        map.put(help.AppChangelog.cons, help.AppChangelog);
        map.put(MessageEntityUnknown.cons, MessageEntityUnknown);
        map.put(MessageEntityMention.cons, MessageEntityMention);
        map.put(MessageEntityHashtag.cons, MessageEntityHashtag);
        map.put(MessageEntityBotCommand.cons, MessageEntityBotCommand);
        map.put(MessageEntityUrl.cons, MessageEntityUrl);
        map.put(MessageEntityEmail.cons, MessageEntityEmail);
        map.put(MessageEntityBold.cons, MessageEntityBold);
        map.put(MessageEntityItalic.cons, MessageEntityItalic);
        map.put(MessageEntityCode.cons, MessageEntityCode);
        map.put(MessageEntityPre.cons, MessageEntityPre);
        map.put(MessageEntityTextUrl.cons, MessageEntityTextUrl);
        map.put(MessageEntityMentionName.cons, MessageEntityMentionName);
        map.put(InputMessageEntityMentionName.cons, InputMessageEntityMentionName);
        map.put(InputChannelEmpty.cons, InputChannelEmpty);
        map.put(InputChannel.cons, InputChannel);
        map.put(contacts.ResolvedPeer.cons, contacts.ResolvedPeer);
        map.put(MessageRange.cons, MessageRange);
        map.put(updates.ChannelDifferenceEmpty.cons, updates.ChannelDifferenceEmpty);
        map.put(updates.ChannelDifferenceTooLong.cons, updates.ChannelDifferenceTooLong);
        map.put(updates.ChannelDifference.cons, updates.ChannelDifference);
        map.put(ChannelMessagesFilterEmpty.cons, ChannelMessagesFilterEmpty);
        map.put(ChannelMessagesFilter.cons, ChannelMessagesFilter);
        map.put(ChannelParticipant.cons, ChannelParticipant);
        map.put(ChannelParticipantSelf.cons, ChannelParticipantSelf);
        map.put(ChannelParticipantModerator.cons, ChannelParticipantModerator);
        map.put(ChannelParticipantEditor.cons, ChannelParticipantEditor);
        map.put(ChannelParticipantKicked.cons, ChannelParticipantKicked);
        map.put(ChannelParticipantCreator.cons, ChannelParticipantCreator);
        map.put(ChannelParticipantsRecent.cons, ChannelParticipantsRecent);
        map.put(ChannelParticipantsAdmins.cons, ChannelParticipantsAdmins);
        map.put(ChannelParticipantsKicked.cons, ChannelParticipantsKicked);
        map.put(ChannelParticipantsBots.cons, ChannelParticipantsBots);
        map.put(ChannelRoleEmpty.cons, ChannelRoleEmpty);
        map.put(ChannelRoleModerator.cons, ChannelRoleModerator);
        map.put(ChannelRoleEditor.cons, ChannelRoleEditor);
        map.put(channels.ChannelParticipants.cons, channels.ChannelParticipants);
        map.put(channels.ChannelParticipant.cons, channels.ChannelParticipant);
        map.put(help.TermsOfService.cons, help.TermsOfService);
        map.put(FoundGif.cons, FoundGif);
        map.put(FoundGifCached.cons, FoundGifCached);
        map.put(messages.FoundGifs.cons, messages.FoundGifs);
        map.put(messages.SavedGifsNotModified.cons, messages.SavedGifsNotModified);
        map.put(messages.SavedGifs.cons, messages.SavedGifs);
        map.put(InputBotInlineMessageMediaAuto.cons, InputBotInlineMessageMediaAuto);
        map.put(InputBotInlineMessageText.cons, InputBotInlineMessageText);
        map.put(InputBotInlineMessageMediaGeo.cons, InputBotInlineMessageMediaGeo);
        map.put(InputBotInlineMessageMediaVenue.cons, InputBotInlineMessageMediaVenue);
        map.put(InputBotInlineMessageMediaContact.cons, InputBotInlineMessageMediaContact);
        map.put(InputBotInlineMessageGame.cons, InputBotInlineMessageGame);
        map.put(InputBotInlineResult.cons, InputBotInlineResult);
        map.put(InputBotInlineResultPhoto.cons, InputBotInlineResultPhoto);
        map.put(InputBotInlineResultDocument.cons, InputBotInlineResultDocument);
        map.put(InputBotInlineResultGame.cons, InputBotInlineResultGame);
        map.put(BotInlineMessageMediaAuto.cons, BotInlineMessageMediaAuto);
        map.put(BotInlineMessageText.cons, BotInlineMessageText);
        map.put(BotInlineMessageMediaGeo.cons, BotInlineMessageMediaGeo);
        map.put(BotInlineMessageMediaVenue.cons, BotInlineMessageMediaVenue);
        map.put(BotInlineMessageMediaContact.cons, BotInlineMessageMediaContact);
        map.put(BotInlineResult.cons, BotInlineResult);
        map.put(BotInlineMediaResult.cons, BotInlineMediaResult);
        map.put(messages.BotResults.cons, messages.BotResults);
        map.put(ExportedMessageLink.cons, ExportedMessageLink);
        map.put(MessageFwdHeader.cons, MessageFwdHeader);
        map.put(auth.CodeTypeSms.cons, auth.CodeTypeSms);
        map.put(auth.CodeTypeCall.cons, auth.CodeTypeCall);
        map.put(auth.CodeTypeFlashCall.cons, auth.CodeTypeFlashCall);
        map.put(auth.SentCodeTypeApp.cons, auth.SentCodeTypeApp);
        map.put(auth.SentCodeTypeSms.cons, auth.SentCodeTypeSms);
        map.put(auth.SentCodeTypeCall.cons, auth.SentCodeTypeCall);
        map.put(auth.SentCodeTypeFlashCall.cons, auth.SentCodeTypeFlashCall);
        map.put(messages.BotCallbackAnswer.cons, messages.BotCallbackAnswer);
        map.put(messages.MessageEditData.cons, messages.MessageEditData);
        map.put(InputBotInlineMessageID.cons, InputBotInlineMessageID);
        map.put(InlineBotSwitchPM.cons, InlineBotSwitchPM);
        map.put(messages.PeerDialogs.cons, messages.PeerDialogs);
        map.put(TopPeer.cons, TopPeer);
        map.put(TopPeerCategoryBotsPM.cons, TopPeerCategoryBotsPM);
        map.put(TopPeerCategoryBotsInline.cons, TopPeerCategoryBotsInline);
        map.put(TopPeerCategoryCorrespondents.cons, TopPeerCategoryCorrespondents);
        map.put(TopPeerCategoryGroups.cons, TopPeerCategoryGroups);
        map.put(TopPeerCategoryChannels.cons, TopPeerCategoryChannels);
        map.put(TopPeerCategoryPeers.cons, TopPeerCategoryPeers);
        map.put(contacts.TopPeersNotModified.cons, contacts.TopPeersNotModified);
        map.put(contacts.TopPeers.cons, contacts.TopPeers);
        map.put(DraftMessageEmpty.cons, DraftMessageEmpty);
        map.put(DraftMessage.cons, DraftMessage);
        map.put(messages.FeaturedStickersNotModified.cons, messages.FeaturedStickersNotModified);
        map.put(messages.FeaturedStickers.cons, messages.FeaturedStickers);
        map.put(messages.RecentStickersNotModified.cons, messages.RecentStickersNotModified);
        map.put(messages.RecentStickers.cons, messages.RecentStickers);
        map.put(messages.ArchivedStickers.cons, messages.ArchivedStickers);
        map.put(messages.StickerSetInstallResultSuccess.cons, messages.StickerSetInstallResultSuccess);
        map.put(messages.StickerSetInstallResultArchive.cons, messages.StickerSetInstallResultArchive);
        map.put(StickerSetCovered.cons, StickerSetCovered);
        map.put(StickerSetMultiCovered.cons, StickerSetMultiCovered);
        map.put(MaskCoords.cons, MaskCoords);
        map.put(InputStickeredMediaPhoto.cons, InputStickeredMediaPhoto);
        map.put(InputStickeredMediaDocument.cons, InputStickeredMediaDocument);
        map.put(Game.cons, Game);
        map.put(InputGameID.cons, InputGameID);
        map.put(InputGameShortName.cons, InputGameShortName);
        map.put(HighScore.cons, HighScore);
        map.put(messages.HighScores.cons, messages.HighScores);
    
        return map;
    })();
} // namespace API
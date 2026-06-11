# Kinly Firebase schema and cost strategy

Kinly stores small, query-friendly documents and denormalizes only hot data needed to avoid repeated reads.

## Collections

### `users/{userId}`
```ts
{ id, fullName, phoneNumber, profilePhoto, role, createdAt, createdAtServer }
```
Subcollections:
- `users/{userId}/families/{familyId}`: `{ familyId, role, joinedAt }`
- `users/{userId}/devices/{fcmToken}`: FCM registration records.

### `families/{familyId}`
```ts
{ familyId, familyName, familyPhoto, inviteCode, createdBy, createdAt, memberCount }
```
Subcollection `familyMembers/{userId}`:
```ts
{ userId, familyId, role: 'admin' | 'member', joinedAt, displayName, photoURL }
```

### `chats/{chatId}`
```ts
{ chatId, familyId, type, participantIds, title, photoURL, lastMessage, pinnedMessageId, typing, updatedAt }
```
Messages are subcollections: `chats/{chatId}/messages/{messageId}`.
```ts
{ messageId, chatId, familyId, senderId, type, text, mediaUrl, thumbnailUrl, voiceDurationMs, reactions, readBy, deliveredTo, status, createdAt }
```

### `events/{eventId}`
```ts
{ eventId, familyId, title, description, date, time, type, createdBy, createdAt, reminderAt }
```

### `expenses/{expenseId}`
```ts
{ expenseId, familyId, title, amount, paidBy, participants, date, createdAt }
```

### `locations/{familyId_userId}`
Only the latest location is stored:
```ts
{ familyId, userId, latitude, longitude, accuracy, updatedAt, sharingEnabled }
```

### `notifications/{notificationId}`
```ts
{ familyId, type, title, body, recipientIds, createdAt, readBy }
```

## Composite indexes

Create these Firestore indexes:

1. `chats`: `familyId ASC, updatedAt DESC` for chat lists.
2. `chats/{chatId}/messages`: `createdAt DESC` for message pagination.
3. `events`: `familyId ASC, date ASC` for upcoming events.
4. `expenses`: `familyId ASC, date DESC` for expense history.
5. `locations`: `familyId ASC, sharingEnabled ASC` for active map members.
6. `families`: `inviteCode ASC` for joining families.

## Query examples

- Chat list: query `chats` by `familyId`, order by `updatedAt`, limit 50. The `lastMessage` field prevents one extra read per chat.
- Messages: query `chats/{chatId}/messages`, order by `createdAt desc`, limit 20; paginate older pages with `startAfter(lastDoc)`.
- Events: query `events` by `familyId`, order by `date`, limit 30.
- Expenses: query `expenses` by `familyId`, order by `date desc`, limit 100.
- Locations: query `locations` by `familyId` and `sharingEnabled == true`.

## Implemented cost optimizations

- **Pagination everywhere hot**: messages load only the latest 20, and repositories expose `startAfter()` pagination.
- **Scoped listeners**: chat message listeners are attached by the chat screen hook and automatically detached on screen unmount.
- **No latest-message fan-out reads**: chat documents store `lastMessage`, so the chat list does not query every message subcollection.
- **Media compression**: images are resized to max width 1080px at 80% quality before upload.
- **Thumbnails first**: uploads generate a 320px thumbnail and store it beside the full image; chat bubbles should render thumbnails and fetch full images only after tap.
- **Offline persistence**: Firestore local cache is enabled, and recent messages are mirrored into AsyncStorage for instant chat screen hydration.
- **Latest location only**: live location overwrites a single document per user and avoids unbounded historical writes.
- **Selective notifications**: FCM registration is per device, and notification triggers are reserved for messages, events, reached-home, and invitations.

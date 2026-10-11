# Security Specification & Test Matrix

## 1. Data Invariants
- Each user may only read and write their own `/users/{userId}` record where `userId == request.auth.uid`.
- History items under `/users/{userId}/history/{historyId}` must belong strictly to the authenticated user.
- No user can modify or read other users' profiles or history logs.
- All documents must comply with schema bounds (string sizes, number types).

## 2. Dirty Dozen Payloads
1. Unauthorized cross-user profile write (`userId = 'other_user'`) -> DENIED
2. Unauthenticated user profile update -> DENIED
3. Profile injection of oversized strings (> 5000 chars) -> DENIED
4. History creation with mismatched `userId != request.auth.uid` -> DENIED
5. History read for another user's document -> DENIED
6. Negative xp injection (`xp < 0`) -> DENIED
7. Hearts count > 5 or < 0 -> DENIED
8. Random document read on unauthenticated root -> DENIED
9. Tampering with another user's progress history -> DENIED
10. Attempting to list root collections -> DENIED
11. Writing invalid types to numeric score fields -> DENIED
12. Attempt to delete another user's profile -> DENIED

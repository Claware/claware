# Channel Token Storage Implementation Plan

## Overview
Design a minimal channel table to store user Telegram bot tokens with only essential fields.

## Table Design

### channels Table

```sql
CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel_type VARCHAR(20) NOT NULL DEFAULT 'telegram',
  bot_token TEXT NOT NULL,
  bot_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_channels_user_id ON channels(user_id);
CREATE INDEX idx_channels_channel_type ON channels(channel_type);

-- Enable RLS
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only access their own data
CREATE POLICY "Users can only access their own channels"
  ON channels
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
```

### Field Descriptions
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | References auth.users, cascade delete |
| channel_type | VARCHAR(20) | Channel type, defaults to telegram |
| bot_token | TEXT | Telegram bot token |
| bot_name | VARCHAR(255) | Optional: bot name |
| is_active | BOOLEAN | Whether the channel is active |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

## Implementation Steps

### Step 1: Create Database Migration SQL
**File**: `supabase/migrations/001_create_channels_table.sql`
- Create channels table
- Add indexes
- Enable RLS
- Create security policies

### Step 2: Create API Endpoint
**File**: `src/app/api/channels/route.ts`
- POST method to receive bot_token
- Validate user authentication
- Extract bot_name from token (optional)
- Save to database
- Return success/error status

### Step 3: Update Frontend
**File**: `src/app/subscribe/page.tsx`
- Update handleConnect function
- Call /api/channels API
- Handle loading states
- Display success/error feedback

### Step 4: Test Integration
- Verify database table creation
- Test API endpoints
- Test frontend submission flow

## API Contract

### POST /api/channels

**Request Body**:
```json
{
  "bot_token": "123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "channel_type": "telegram",
    "bot_name": "Claware_bot",
    "is_active": true
  }
}
```

**Error Response (400/401/500)**:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Notes
- Uses Supabase SSR for authentication
- Token format validation: regex `^\d+:[A-Za-z0-9_-]+$`
- Supports updating existing records on duplicate submissions

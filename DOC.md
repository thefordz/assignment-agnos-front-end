## Structure Explanation

- `/app/(patient)` – Patient routes and layout.
- `/app/(staff)` – Staff dashboard routes and layout.
- `/features/patient` – Patient-related components.
- `/features/staff` – Staff monitoring components and real-time listeners.
- `/features/shared` – Reusable UI components and shared utilities.
- `/lib/socket.ts` – Client-side Socket.io configuration.
- `/types/socket.ts` – Shared socket event type definitions.

## Component Architecture

### Patient Components

- `PatientFormDialog`  
  Controls form open/close behavior and triggers socket events.

- `PatientForm`  
  Manages form state using React Hook Form and emits real-time updates.

### Staff Components

- `DataTableView`  
  Displays patient list with filters, sort.

- `TwoPanelView`  
  Main monitoring layout combining patient list and live form view.

- `PatientListPanel`  
  Displays connected patients with status and last updated time.

- `PatientLivePanel`  
  Shows real-time form values of selected patient.

- `PatientLiveDialog`  
  Dialog-based detailed form preview.

### Shared Components

- `Field Components`
  - Input
  - Textarea
  - Phone Input
  - Date Picker
  - ComboBox (Select)

## Real-Time Synchronization Flow

1. **Connect**  
   Client establishes socket connection with the server.

2. **Join Role (Patient / Staff)**
   - Patient joins `patient:{id}` room.
   - Staff joins `staff:room`.

3. **Open Form**
   - Status: `Active`
   - Patient is added or updated in the staff monitoring list.

4. **Update Form**
   - Real-time form values are emitted.
   - Staff dashboard updates form preview instantly.

5. **Submit Form**
   - Status: `Submitted`
   - Final form data is broadcast to staff.

6. **Close Form**
   - If not submitted → Status becomes `Inactive`
   - If already submitted → Status remains `Submitted`

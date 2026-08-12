# MediFlow Connect

Build a SIMPLE, polished healthcare appointment-booking concept called MediFlow.

This is NOT intended to be a full healthcare platform.

It is a small UX/Human-Centered Design portfolio project created specifically to demonstrate the skills relevant to a Human-Centered Design / UX role.

The priority is:

User understanding → simple flows → accessibility → prototyping → visual design → implementation

NOT feature quantity.

Keep the project intentionally small.

==================================================
CORE PROJECT

MediFlow helps a person find a doctor and book an appointment through a simple, low-friction flow.

The core problem:

"Healthcare appointment interfaces can make users uncertain about what to do next."

MediFlow solves this by:

reducing unnecessary choices

showing information progressively

using plain language

keeping one primary action per screen

making important information easy to scan

providing clear feedback

considering users with different levels of digital confidence

This is a design concept.

Do NOT claim that real patients were interviewed or that the product has been deployed.

==================================================
IMPORTANT: KEEP IT SMALL

Build ONLY these core screens:

Home / Find a Doctor

Doctor Search Results

Doctor Profile

Select Date & Time

Patient Details

Appointment Confirmation

Optional:

My Appointment

Do NOT build:

authentication

registration

payment

medical records

prescriptions

doctor dashboard

hospital admin

chat

AI diagnosis

complex backend

analytics dashboard

notifications system

real database

The project should be small enough to understand in a 2–3 minute portfolio demo.

==================================================
FIGMA-FIRST WORKFLOW

I specifically want this project to demonstrate Figma usage.

Before implementing the final UI in Lovable, structure the design as a Figma-ready design system and component structure.

If the available Lovable/Figma integration allows direct Figma import, use it.

If Figma integration is available:

Create/design the interface in Figma.

Use Auto Layout.

Use reusable components.

Define typography styles.

Define color styles.

Define spacing.

Define button/input states.

Create the six screens.

Create the basic clickable prototype.

Import the design into Lovable.

Implement the interaction flow in Lovable.

The final project should therefore represent:

Figma → Prototype → Lovable implementation

Do NOT simply generate a UI in Lovable and call it a Figma workflow.

If direct Figma creation/import cannot be performed automatically in the current environment, structure the implementation so that the same components, spacing system, states, and screen hierarchy can be recreated directly in Figma without redesigning the product.

==================================================
FIGMA DESIGN SYSTEM

Create a small professional design system.

Colors:

Primary:
Muted forest green

Background:
Warm off-white

Text:
Deep charcoal

Secondary:
Soft sage

Accent:
Subtle warm yellow

Keep the palette restrained.

Typography:

Use a clean modern sans-serif.

Define:

Display
H1
H2
Body
Small
Label

Spacing:

Use a consistent spacing scale.

Components:

Button
Input
Search field
Doctor card
Filter chip
Date selector
Time slot
Status badge
Appointment summary
Navigation

Create states:

Default
Hover
Focus
Selected
Disabled
Error
Success

This is important because the portfolio needs to demonstrate component thinking.

==================================================
SCREEN 1 — HOME

Headline:

"Find the right care, without the confusion."

Supporting text:

"Find a doctor and choose a convenient appointment time in a few simple steps."

Primary CTA:

"Find a doctor"

Search field:

"Search doctors or specialties"

Show only a few specialties:

General Physician
Dermatologist
Pediatrician
Dentist

Do not overload the screen.

Design principle:

A user should immediately understand what to do.

==================================================
SCREEN 2 — DOCTOR SEARCH

Show a simple list of fictional doctors.

Each card contains:

Doctor name
Specialty
Experience
Languages
Consultation type
Next available slot

Example:

Dr. Ananya Sharma
Dermatologist
8 years experience
English · Hindi
Video consultation
Next available: Today, 5:30 PM

CTA:

"View profile"

Add simple filters:

Specialty
Language
Availability

Do not create a complicated filter system.

==================================================
SCREEN 3 — DOCTOR PROFILE

Show:

Doctor
Specialty
Experience
Languages
Consultation type
Short biography
Available times
Consultation fee

Primary CTA:

"Choose appointment"

The page should answer:

Who is this doctor?
What do they specialize in?
When can I see them?
How will the consultation happen?

The goal is confidence before selection.

==================================================
SCREEN 4 — DATE & TIME

Create a simple appointment picker.

Show:

Today
Tomorrow
Upcoming dates

Then time slots:

9:00 AM
10:30 AM
12:00 PM
3:30 PM
5:30 PM

Use clear states:

Available
Selected
Unavailable

Do NOT rely only on color to communicate state.

Use borders, text, icons or other visual indicators.

Primary CTA:

"Continue"

==================================================
SCREEN 5 — PATIENT DETAILS

Keep the form intentionally short.

Fields:

Full name
Age
Phone number
Reason for visit

Use proper labels.

Example validation:

"Enter a 10-digit phone number."

Instead of:

"Invalid input."

Show helpful error recovery.

Primary CTA:

"Review appointment"

==================================================
SCREEN 6 — CONFIRMATION

Show a clean appointment summary.

Example:

Dr. Ananya Sharma
Dermatologist

Tuesday, 18 August
5:30 PM

Video consultation

Patient:
Aman Pandey

Then:

"Confirm appointment"

After confirmation:

"Your appointment is booked."

Show:

Appointment ID
Doctor
Date
Time
Type

Primary CTA:

"View appointment"

Secondary:

"Back to home"

==================================================
HUMAN-CENTERED DESIGN REQUIREMENTS

The interface should visibly demonstrate HCD thinking.

Design around these principles:

Understand context

Healthcare users may be stressed, distracted, older, unfamiliar with digital products, or booking for someone else.

Reduce cognitive load

Do not present every option at once.

One primary action

Every screen should have a clear next step.

Predictability

Users should understand where they are in the booking process.

Error recovery

Errors should explain what happened and how to fix it.

Accessibility

Design for people with different abilities and digital confidence.

==================================================
SIMPLE USER FLOW

Use this flow:

Find a doctor
↓
Choose doctor
↓
Choose appointment time
↓
Enter patient details
↓
Review
↓
Confirm

Add a simple progress indicator where appropriate:

01 Doctor
02 Time
03 Details
04 Confirm

Do not make the flow complicated.

==================================================
ACCESSIBILITY

This project must demonstrate practical accessibility knowledge.

Implement:

semantic HTML

proper heading hierarchy

readable typography

sufficient contrast

visible keyboard focus

large touch targets

accessible labels

meaningful error messages

no color-only communication

keyboard-friendly controls

reduced-motion support

For example:

BAD:

"Invalid input"

BETTER:

"Enter a 10-digit phone number."

The interface should demonstrate:

Perceivable
Operable
Understandable
Robust

==================================================
LOW-RESOURCE DESIGN

Do NOT create a giant rural/offline feature set.

Instead, demonstrate the concept through a few thoughtful decisions.

Design for:

Low-end Android phones
Slower connections
Limited digital confidence

Use:

lightweight interface

minimal imagery

no unnecessary animation

simple layouts

clear loading state

preserved form information if connection is interrupted

Create ONE simple connection error state:

"Your connection was interrupted."

"Your information is still here."

Button:

"Try again"

This is enough.

Do not pretend the application is actually offline-capable.

==================================================
LANGUAGE / HINDI

Add a simple language switch:

English | हिंदी

It does not need to translate the entire application.

Demonstrate the concept on the main navigation and important actions.

Examples:

Find a doctor
डॉक्टर खोजें

Book appointment
अपॉइंटमेंट बुक करें

My appointments
मेरी अपॉइंटमेंट

Confirm
पुष्टि करें

Make the Hindi typography readable.

The portfolio case study can later explain that actual localization should be validated with native speakers and users.

==================================================
RESEARCH THINKING

Do NOT fabricate research.

Instead, build the product around explicit design hypotheses.

Example:

HYPOTHESIS:

"Users may feel more confident when doctor information, availability, and appointment details are presented in a predictable order."

This can later become a research question.

Possible research questions:

What information do users need before choosing a doctor?

Where do users hesitate during appointment booking?

Which terminology is easiest to understand?

How does language preference affect confidence?

What accessibility barriers appear during form completion?

Do NOT include fake:

interviews
participants
survey results
percentages
quotes
field studies

==================================================
PROPOSED USABILITY TEST

Include a very small "Testing" concept in the project documentation.

Example task:

"Book a dermatology appointment for tomorrow at 5:30 PM."

Potential success measures:

Task completion
Navigation errors
Hesitation
Time-on-task
Comprehension

Do NOT display fabricated results.

Label this:

"Proposed usability test"

==================================================
RESPONSIVE DESIGN

Design mobile-first.

Primary target:

Mobile.

Then support:

Tablet
Desktop

Do not simply scale the desktop interface down.

The mobile booking flow should feel especially polished.

==================================================
VISUAL DIRECTION

Use the same visual language as the portfolio:

Bright
Warm
Clean
Editorial
Human
Accessible

Use:

Warm off-white
Forest green
Soft sage
Deep charcoal
Subtle yellow

Avoid:

Dark mode
Neon
Glassmorphism
Huge gradients
3D graphics
Excessive shadows
Excessive animation
Generic AI-dashboard aesthetics

The project should look like a thoughtful UX case study, not a SaaS template.

==================================================
TECHNOLOGY

Use a simple modern frontend.

React + TypeScript + Tailwind is preferred if appropriate.

No backend is necessary.

Use local/mock data.

The important thing is that the entire flow works.

==================================================
PORTFOLIO DEMO

The final application should allow me to demonstrate this in approximately 2–3 minutes:

Start on Home.

Search for Dermatologist.

Choose a doctor.

Select an appointment time.

Enter patient details.

Review.

Confirm.

Show confirmation.

Toggle Hindi.

Demonstrate an error state.

Demonstrate the accessible focus/interaction behavior.

That is enough.

==================================================
FINAL DELIVERABLE

I want:

A polished Figma-ready design system.

Six well-designed screens.

A simple clickable prototype flow.

A functional Lovable implementation.

Responsive mobile and desktop layouts.

Accessibility states.

Hindi localization example.

One low-connectivity error state.

Clear form validation.

Reusable components.

MOST IMPORTANT:

Do not add features simply to make the project look bigger.

A small project executed thoughtfully is better for this portfolio than a huge healthcare application with meaningless features.

The final project should communicate:

"I understand users, I can structure an experience, I can design in Figma, I can prototype, I understand accessibility and inclusive design, and I can turn the design into a working interface."

That is the goal.

Figma is a required part of this project, not an optional reference. The final project should have a corresponding Figma design system and prototype. Use Figma concepts such as Auto Layout, reusable components, variants, component states, typography styles, color styles, spacing, responsive frames, and interactive prototyping. The portfolio case study should later be able to show screenshots/links of the Figma work alongside the implemented Lovable product. Do not describe the project as Figma-designed unless an actual Figma design/prototype has been created.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a26ec810-8b21-47ff-aa1f-7503c3fff057).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

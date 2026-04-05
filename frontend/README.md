# Event Management System

Group project for the System Analysis and Design (SAD) course. This repository contains the React front end for a College Event Management System (CEMS).

## Abstract

The current campus event coordination relies on uncoordinated manual processes, such as short-term notices and hectic paper-based registrations, often leading to schedule overlaps, venue conflicts, and poor student engagement. This report proposes the analysis and design of a centralized College Event Management System (CEMS) built on the MERN (MongoDB, Express.js, React, Node.js) stack to streamline these operations.

Following System Analysis and Design (SAD) principles, the project identifies key functional requirements including automated conflict-free booking, digital ticketing, and a real-time event dashboard. The system utilizes MongoDB for flexible data storage, Express and Node.js for a high-performance RESTful API, and React to provide a highly responsive, interactive user interface. The design is modeled through Data Flow Diagrams (DFDs) and Entity-Relationship Diagrams (ERDs) to ensure data integrity and efficient process flow. The proposed system aims to provide a unified, scalable platform that enhances administrative oversight and improves the overall campus experience for both students and faculty.

## Introduction

This document is the System Analysis and Design for the Event Management System (EMS). It contains detailed functional, non-functional, and support requirements and establishes a requirements baseline for development of the system. The requirements contained in this report are independent, uniquely numbered, and organized by topic. The report serves as the official means of communicating user requirements to the developer and provides a common reference point for both the developer team and stakeholder community. This System Analysis and Design will evolve over time as users and developers work together to validate, clarify and expand its contents.

## Problem Statement

- There is no viable way to find reliable sources of event details unless you are with the event organizing team.
- The administrative events do not convey the necessary program info properly.
- There is no coordinated centralized platform in the college that lists all the events and upcoming events in ordered fashion.
- Current events rely on short-term, uncoordinated notices which are easy to miss.

## Scope

This project focuses on a web-based authenticated interface for creating new events and a notification system for running and upcoming events. The scope considers only students and faculty members of campus administration.

## Objectives

- Identify inefficiencies, bottlenecks, and data redundancies in how the college currently manages events.
- Clearly outline what the system must do, such as event registration, venue booking, and attendee tracking.
- Create a blueprint for the system using UML diagrams and Data Flow Diagrams.
- Design a structured database that ensures data integrity for student records, event schedules, and resource allocations.
- Determine the technical, operational, and economic viability of the proposed digital solution.
- Design a bug-free user-friendly frontend and secured backend that smoothly operates in the intended workflow.

## Rationale

Patan Campus has a busy schedule, and students and faculty members are always conscious about events and tasks. But this consciousness is not always enough to guarantee participation in events. Some websites like Facebook provide event features, but most are not made for professional or institutional needs. Patan Campus, aiming to be the number one CSIT college of Nepal, needs a customized platform to manage official events. Thus, this system is proposed.

## Tech Stack

- Front end: React, Vite, Tailwind CSS
- Planned backend: Node.js, Express.js
- Planned database: MongoDB

## Prerequisites

- Node.js 18+ (or newer)
- pnpm (recommended) or npm

## Setup

```bash
pnpm install
```

If you prefer npm:

```bash
npm install
```

## Run (Development)

```bash
pnpm dev
```

Or with npm:

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Build

```bash
pnpm build
```

## Preview Production Build

```bash
pnpm preview
```

## Lint

```bash
pnpm lint
```

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { DocsContent } from "@/components/layout/DocsContent";
import { AnalyzerModuleDiagram } from "@/components/ui/AnalyzerModuleDiagram";
import { DiagramComponentsAccordion } from "@/components/ui/DiagramComponentsAccordion";
import FilesHandlerDiagram from "@/components/ui/FilesHandlerDiagram";
import { LlmInterfaceDiagram } from "@/components/ui/LlmInterfaceDiagram";
import { PageTitle } from "@/components/ui/PageTitle";
import { QCoreInternalDiagram } from "@/components/ui/QCoreInternalDiagram";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const architectureModuleTitles: Record<string, string> = {
  "qagent-core": "QAgent Core",
  "files-handler": "Files Handler",
  analyzer: "Analyzer",
  "intent-clarification": "Intent + Clarification",
  dal: "DAL",
  uagent: "UAgent",
  approval: "Approval (UI-triggered, Core-enforced)",
  dagent: "DAgent",
  versioning: "Versioning",
};

const placeholderSections = [
  "Overview",
  "Purpose",
  "Core Responsibilities",
  "Inputs",
  "Outputs",
  "Dependencies",
  "Control Boundaries",
  "Operational Flow",
  "Open Items",
] as const;

const filesHandlerOverviewBody = [
  "### Overview",
  "The Files Handler is the input gateway for file-driven workflows in QAgent.",
  "It receives uploads, links, and session-based file references, then validates, normalizes, and prepares all files before analysis.",
  "This is the first operational step after QCore initialization in file-based flows.",
  "### Module Type",
  "Input Processing Layer (File Ingestion & Preparation).",
  "### Purpose",
  "Accept files from multiple sources, enforce integrity/format validation, normalize structure, organize file records, and provide clean references for downstream modules.",
  "### Position in System Flow",
  "QAgent Core -> Files Handler -> Analyzer. Files Handler is the first operational module after input.",
  "### Internal Structure",
  "Input Gateway: supports local uploads, drag & drop, external links, and previously stored files.",
  "File Validator: checks type, size, format compatibility, and integrity/corruption.",
  "File Normalizer: converts file input into internal representation, unifies metadata, and enforces consistent structure.",
  "File Metadata Extractor: extracts file name, format, size, and audio properties (duration/sample rate) when relevant.",
  "File Storage Manager: assigns file IDs, manages storage location, and creates access references.",
  "File Registry: maintains active session files, processed files, and file relationship mappings.",
  "### Flow",
  "User Input (File) -> Input Gateway -> File Validator -> File Normalizer -> Metadata Extractor -> Storage Manager -> File Registry -> QCore / Analyzer.",
  "### Inputs",
  "File upload, file link, existing file reference, and user-triggered file selection.",
  "### Outputs",
  "Validated file object, normalized file structure, extracted metadata, file reference ID, and storage location.",
  "### Control Boundary",
  "Critical boundary: Files Handler does not analyze content and does not execute processing. It only prepares files for safe system use.",
  "### System Behavior",
  "Ensures every file is validated before use, normalized into consistent format, assigned stable references, and blocked from downstream modules if invalid.",
  "### Non Responsibilities",
  "Does not perform analysis, interpret content, generate UI, execute DSP, or make decisions.",
  "### Failure Handling",
  "Invalid file -> reject. Unsupported format -> notify. Corrupted file -> block processing. Missing metadata -> fallback extraction.",
  "### Architectural Summary",
  "Files Handler is the input gateway of QAgent, responsible for receiving, validating, organizing, and preparing files for downstream processing while preserving integrity and consistency.",
  "### Validation",
  "{\"file_ingestion_defined\": true, \"validation_enforced\": true, \"normalization_complete\": true, \"metadata_extracted\": true, \"ready_for_analysis\": true}",
] as const;

const inputGatewaySpecificationBody = [
  "### Purpose",
  "Input Gateway is the entry component of Files Handler.",
  "It receives file inputs from multiple sources, resolves their origin, normalizes them into a unified structure, and forwards the structured input to File Validator.",
  "### Module Type",
  "Input Entry Component operating as a stateless processing unit.",
  "### Core Responsibilities",
  "Receive incoming file input, detect and classify source type, normalize to a consistent structure, attach minimal metadata, and forward the result to validation.",
  "### Interface Contract",
  "Input includes request type and payload. Output is a unified file input object with generated identity, normalized source type, raw data reference, and basic metadata.",
  "### Process Lifecycle",
  "Receive input, detect source type, resolve source, normalize structure, attach metadata, generate file identifier, and forward to File Validator.",
  "### Source Resolution Logic",
  "The gateway maps request conditions to source classes such as upload, drag and drop, external link, and existing file reference.",
  "### Internal Flow",
  "User input enters Input Gateway, passes through source detection and resolution, then normalization and metadata attachment, and exits as a structured file input for File Validator.",
  "### Supported Input Types",
  "Local file upload, drag and drop, external URL from cloud or remote storage, and existing system file reference.",
  "### Control Boundary",
  "Input Gateway classifies and normalizes input. It does not validate integrity, check compatibility, store files, or analyze content.",
  "### Error Handling",
  "Must handle unsupported input source, missing payload, and invalid file reference scenarios with explicit rejection signals.",
  "### State Interaction",
  "Input Gateway is stateless, does not persist data, and does not modify shared runtime state.",
  "### Extensibility",
  "New source types should be addable without changing core gateway behavior, including microphone input, live stream input, API ingestion, and batch input.",
  "### Flow Integration",
  "QCore routes into Files Handler, Files Handler calls Input Gateway, and Input Gateway forwards normalized output to File Validator.",
  "### Architectural Rules",
  "The gateway remains lightweight, avoids business logic, stays independent of specific file types, and produces consistent output regardless of source.",
  "### Validation",
  "Interface, lifecycle, source resolution, error handling, stateless behavior, and extensibility are all defined and implementation-ready.",
] as const;

const fileValidatorSpecificationBody = [
  "### Purpose",
  "File Validator validates incoming files after ingestion by Input Gateway.",
  "It enforces type, size, format compatibility, and integrity requirements before allowing files to proceed.",
  "### Module Type",
  "Validation Layer serving as a pre-processing gatekeeper.",
  "### Core Responsibilities",
  "Validate file type, enforce size limits, verify format compatibility, check integrity, block invalid inputs, and return structured validation outcomes.",
  "### Interface Contract",
  "Input is the unified file input object produced by Input Gateway. Output is a structured validation result containing validity status, error list, warning list, and validated input when applicable.",
  "### Process Lifecycle",
  "Receive file input, validate type, validate size, validate format compatibility, run integrity checks, aggregate results, and return validation outcome.",
  "### Validation Rules",
  "Type Validation: only supported file types are accepted.",
  "Size Validation: maximum size is enforced and optional minimum size can be enforced.",
  "Format Compatibility: file format and encoding/container constraints must match system capabilities.",
  "Integrity Check: corrupted or unreadable files are rejected.",
  "### Internal Flow",
  "File input passes through type, size, format, and integrity checks, then validation is aggregated into a single structured result.",
  "### Inputs",
  "Unified FileInput from Input Gateway.",
  "### Outputs",
  "Validation result with validity state, errors for invalid files, and warnings for partially valid files.",
  "### Control Boundary",
  "File Validator enforces validation rules and blocks invalid files, but does not modify content, store files, analyze semantics, or perform transformations.",
  "### Error Handling",
  "Must explicitly handle unsupported file type, file too large, invalid format, and corrupted file scenarios.",
  "### State Interaction",
  "File Validator is stateless, does not persist data, and only returns validation results.",
  "### Extensibility",
  "Validation layer supports adding file types, extending rules, and custom validation pipelines per file category.",
  "### Flow Integration",
  "Input Gateway -> File Validator -> File Normalizer.",
  "### Architectural Rules",
  "Validation must fail early on invalid input, remain deterministic, return structured results, and prevent invalid files from proceeding.",
  "### Validation",
  "Validation rules are defined, errors are structured, behavior is stateless and fail-fast, and the module is implementation-ready.",
] as const;

const fileNormalizerSpecificationBody = [
  "### Purpose",
  "File Normalizer converts validated file inputs into a unified internal representation.",
  "It standardizes structure and metadata across all sources and formats to ensure reliable downstream processing.",
  "### Module Type",
  "Normalization Layer serving as a structure standardization component.",
  "### Core Responsibilities",
  "Convert validated input into internal representation, normalize metadata, enforce consistent structure, prepare files for analysis, and remove source-specific inconsistencies.",
  "### Interface Contract",
  "Input is validated file input from File Validator. Output is a normalized file object with unified content representation and standardized metadata.",
  "### Process Lifecycle",
  "Receive validated input, detect file format, convert to internal representation, normalize structure, extract and unify metadata, enforce schema consistency, and emit normalized output.",
  "### Normalization Rules",
  "Representation Standardization: abstract source differences such as upload, URL, and reference into one internal model.",
  "Metadata Normalization: ensure consistent metadata fields and fill missing metadata when possible.",
  "Format Harmonization: align incoming formats to supported standards and normalize encoding/container structure when needed.",
  "Structure Enforcement: enforce a single schema to prevent downstream variability.",
  "### Internal Flow",
  "Validated file input passes through format detection, representation conversion, metadata extraction and normalization, then structure enforcement, and exits as a normalized file object.",
  "### Inputs",
  "Validated file input from File Validator.",
  "### Outputs",
  "Normalized file object, unified metadata, and consistent internal representation.",
  "### Control Boundary",
  "File Normalizer standardizes structure and metadata, but does not validate integrity, perform semantic analysis, execute processing logic, or store files.",
  "### Error Handling",
  "Must handle unsupported format, conversion failure, and metadata extraction failure with explicit structured errors.",
  "### State Interaction",
  "File Normalizer is stateless, does not persist data, and only produces normalized output.",
  "### Extensibility",
  "Supports adding new file type handlers, extending metadata extraction logic, and enabling additional internal formats.",
  "### Flow Integration",
  "File Validator -> File Normalizer -> Metadata Extractor / Analyzer.",
  "### Architectural Rules",
  "Normalization must produce consistent output, isolate source differences, block inconsistent structures, and remain deterministic.",
  "### Validation",
  "Structure is unified, metadata is normalized, behavior is stateless and consistent, and the component is implementation-ready.",
] as const;

const fileMetadataExtractorSpecificationBody = [
  "### Purpose",
  "File Metadata Extractor extracts essential metadata from normalized files.",
  "It provides structured file characteristics including identity, format, size, and domain-specific properties such as audio duration and sample rate.",
  "### Module Type",
  "Metadata Extraction Layer acting as a file intelligence component.",
  "### Core Responsibilities",
  "Extract core metadata, identify format and properties, extract domain-specific attributes, provide structured metadata downstream, and enrich normalized file representation.",
  "### Interface Contract",
  "Input is a normalized file from File Normalizer. Output is an enriched file object containing unified content plus enriched metadata.",
  "### Process Lifecycle",
  "Receive normalized file, identify file type, extract basic metadata, extract domain-specific metadata, validate extracted values, enrich metadata structure, and emit enriched output.",
  "### Extraction Rules",
  "Basic Metadata: extract file name, size, and format.",
  "Format Identification: detect actual format beyond extension and normalize format naming.",
  "Domain-Specific Extraction: for audio include duration, sample rate, and channels; for other types support extendable metadata fields.",
  "Metadata Enrichment: combine extracted values into unified structure, fill missing values when possible, and preserve consistency.",
  "### Internal Flow",
  "Normalized file passes through file type detection, basic extraction, domain-specific extraction, validation, and enrichment to produce enriched output.",
  "### Inputs",
  "Normalized file object from File Normalizer.",
  "### Outputs",
  "Enriched file object with structured metadata and domain-specific properties.",
  "### Control Boundary",
  "Metadata Extractor extracts and enriches metadata only. It does not validate integrity, modify content, perform semantic analysis beyond metadata, or execute transformations.",
  "### Error Handling",
  "Must explicitly handle metadata extraction failure, unsupported metadata type, and invalid extracted metadata values.",
  "### State Interaction",
  "Metadata Extractor is stateless, does not persist data, and returns enriched output only.",
  "### Extensibility",
  "Supports adding extractors per file type, extending domain-specific metadata fields, and supporting new media types.",
  "### Flow Integration",
  "File Normalizer -> Metadata Extractor -> File Storage Manager / Analyzer.",
  "### Architectural Rules",
  "Must remain source-agnostic, operate only on normalized structure, provide consistent metadata format, and stay deterministic.",
  "### Validation",
  "Metadata extraction is defined, audio properties are supported, behavior is stateless, structure is enriched, and the module is implementation-ready.",
] as const;

const fileStorageManagerSpecificationBody = [
  "### Purpose",
  "File Storage Manager assigns unique file identifiers, manages storage locations, and generates stable access references for files entering the system.",
  "It ensures each file is persistently addressable and consistently accessible across QAgent.",
  "### Module Type",
  "Storage Coordination Layer for file persistence and reference management.",
  "### Core Responsibilities",
  "Assign unique file IDs, determine storage location, persist file or reference, generate stable access references, and maintain mapping between identifiers and storage paths.",
  "### Interface Contract",
  "Input is an enriched file from Metadata Extractor. Output is a stored file object containing file ID, storage location, access reference, and essential metadata.",
  "### Process Lifecycle",
  "Receive enriched file, generate unique ID, determine storage strategy, persist file or reference, create access reference, register mapping, and return stored file output.",
  "### Storage Rules",
  "File ID Assignment: use unique deterministic or UUID-style identifiers, avoid collisions, and keep identifier consistency.",
  "Storage Strategy: support local storage, cloud storage, and external references for remote files.",
  "Access Reference: must remain stable and retrievable through internal path, signed URL, or database reference models.",
  "File Mapping: maintain clear mapping of File ID to storage location and access reference.",
  "### Internal Flow",
  "Enriched file goes through ID generation, storage decision, persistence or reference save, access reference creation, mapping registration, then returns as stored file output.",
  "### Inputs",
  "Enriched file object from Metadata Extractor.",
  "### Outputs",
  "Stored file object with file ID, storage location, and access reference.",
  "### Control Boundary",
  "Storage Manager assigns IDs, manages storage, and creates references. It does not validate files, analyze content, modify file structure, or execute business logic.",
  "### Error Handling",
  "Must explicitly handle storage failure, ID collision, and access reference creation failure.",
  "### State Interaction",
  "Writes file reference records to shared system state through registry/state coordination layers without owning global state logic.",
  "### Extensibility",
  "Supports multiple storage backends, switching storage strategies, and integration with external storage providers.",
  "### Flow Integration",
  "Metadata Extractor -> File Storage Manager -> File Registry / Analyzer.",
  "### Architectural Rules",
  "Every file must receive a unique ID, access references must remain stable, storage concerns must stay abstracted from QCore, and multiple storage strategies must be supported.",
  "### Validation",
  "ID assignment, storage management, reference creation, and multi-storage support are defined and implementation-ready.",
] as const;

const fileRegistrySpecificationBody = [
  "### Purpose",
  "File Registry maintains a structured record of all files in the current system context.",
  "It tracks active session files, processed files, and file relationships to ensure consistent access, traceability, and dependency awareness across QAgent.",
  "### Module Type",
  "File Tracking Layer serving as a session-level file management system.",
  "### Core Responsibilities",
  "Maintain active file registry, track processed and derived files, manage file relationships, provide lookup and retrieval, and support traceability across transformations.",
  "### Interface Contract",
  "Input includes stored files, registry updates, and lookup requests. Output is a registry entry model that exposes status, relationships, metadata, and reference mapping for retrieval.",
  "### Process Lifecycle",
  "Receive stored file, create registry entry, assign status, register relationships, persist entry in registry, expose lookup access, and update entries when file state changes.",
  "### Registry Rules",
  "Active Files: currently used files in session and available for processing.",
  "Processed Files: files that completed processing and can serve as outputs or references.",
  "Derived Files: files generated from other files and linked with explicit parent-child mapping.",
  "Relationship Mapping: maintain explicit lineage from original file to processed file to derived variants.",
  "### Internal Flow",
  "Stored file enters registry creation flow, receives status assignment and relationship linking, then becomes an accessible registry entry for downstream modules.",
  "### Inputs",
  "Stored files from File Storage Manager, update events from processing modules, and relationship mapping data.",
  "### Outputs",
  "Registry entries, file lookup results, and relationship graph context.",
  "### Control Boundary",
  "File Registry tracks records and relationships and provides lookup. It does not physically store files, validate file integrity, analyze content, or execute processing operations.",
  "### Error Handling",
  "Must explicitly handle duplicate registration attempts, missing file lookup requests, and invalid relationship mappings.",
  "### State Interaction",
  "Integrates with State Manager, maintains session-level file awareness, and provides retrieval support for QCore decision-making.",
  "### Extensibility",
  "Supports expanded relationship types, multi-file workflow coordination, and integration with versioning systems.",
  "### Flow Integration",
  "File Storage Manager -> File Registry -> Analyzer / QCore.",
  "### Architectural Rules",
  "Every file must be registered, relationships must remain explicit, registry consistency must be preserved, and multi-step workflows must be supported.",
  "### Validation",
  "File tracking, relationship mapping, lookup availability, and state integration are defined and implementation-ready.",
  "### Deep Insight",
  "File Registry is the continuity anchor between ingestion and reasoning: when lineage is explicit, QCore can reason over file evolution, not only over isolated files.",
] as const;

const analyzerModuleStructureBody = [
  "### Goal",
  "Analyzer is the module responsible for transforming raw inputs into structured, machine-usable representations.",
  "It extracts meaning, structure, and features without making decisions or executing actions.",
  "### Overview",
  "Analyzer is the interpretation layer of the system.",
  "It receives normalized input from Files Handler and converts it into structured data, detected features, and contextual signals that enable QCore reasoning.",
  "### Module Type",
  "Analysis Layer serving as the input interpretation system.",
  "### Purpose",
  "Understand input content, extract structure and meaning, detect relevant features, convert raw input into analysis-ready data, and prepare context for reasoning.",
  "### Position in Flow",
  "Files Handler -> Analyzer -> Intent + Clarification.",
  "### Internal Structure",
  "Content Scanner: text extraction, document scanning, basic summarization, and content segmentation.",
  "Audio Recognizer: speech-to-text, segmentation by regions or events, signal detection, and audio feature extraction.",
  "System Data Parser: metadata extraction, JSON/CSV parsing, structured format detection, and contextual attributes.",
  "Knowledge Fetcher: contextual enrichment through related context retrieval and internal data querying.",
  "Feature Extractor: entity extraction, pattern detection, anomaly detection, and relationship identification.",
  "Structure Builder: unified output schema, normalized entities, and analysis-ready representation.",
  "### Flow",
  "Input from Files Handler passes through content/audio/data parsing, then feature extraction, then structure building, and exits as analyzer output for QCore.",
  "### Inputs",
  "Normalized file, metadata, file reference, and optional context.",
  "### Outputs",
  "Structured representation, extracted entities, detected features, segmentation data, and analysis metadata.",
  "### Control Boundary",
  "Analyzer interprets and structures information only. It does not decide, route, or execute actions.",
  "### System Behavior",
  "Must maintain consistent structure across input types, accurate key-feature extraction, modular analysis by content type, and readiness for downstream reasoning.",
  "### Non Responsibilities",
  "Does not perform reasoning decisions, select tools, control flow, or execute operations.",
  "### Failure Handling",
  "Unsupported format triggers partial analysis, missing data triggers fallback extraction, and noisy input triggers best-effort parsing.",
  "### Architectural Summary",
  "Analyzer is the interpretation engine of QAgent, converting raw inputs into structured and meaningful representations for downstream decision layers.",
  "### Validation",
  "Analysis definition, structure extraction, feature detection, and no-decision boundary are established and reasoning-ready.",
  "### Deep Insight",
  "Analyzer quality directly determines decision quality: when representation is stable and rich, downstream reasoning becomes safer, faster, and more deterministic.",
] as const;

const contentScannerBody = [
  "### Module Type",
  "Content Extraction Component as an Analyzer submodule.",
  "### Purpose",
  "Extract and interpret textual and structural information from input files, transforming raw content into analyzable segments.",
  "### Overview",
  "Content Scanner processes general file content and extracts meaningful textual and structural data.",
  "It serves as the primary entry point for understanding non-audio inputs, enabling document-type identification, text extraction, and preparation for deeper analysis.",
  "### Responsibilities",
  "Extract text from files.",
  "Perform document scanning, including OCR when needed.",
  "Identify document type and structural layout.",
  "Generate basic summaries.",
  "Segment content into logical units.",
  "### Core Capabilities",
  "Text Extraction: extract raw text across multiple formats such as PDF, TXT, and DOC.",
  "Document Scanning: analyze document structure, detect headings/sections/layout, and apply OCR for scanned inputs.",
  "Basic Summarization: generate high-level summaries, identify key points, and provide fast context understanding.",
  "Content Segmentation: split content into logical blocks such as paragraphs and sections for downstream analysis.",
  "### Flow",
  "Input File -> Text Extraction -> Document Scanning -> Summarization -> Content Segmentation -> Structured Output.",
  "### Inputs",
  "Normalized file from Files Handler, file metadata, and file reference.",
  "### Outputs",
  "Extracted text, document structure, summary, and segmented content blocks.",
  "### Control Boundary",
  "Content Scanner does not perform reasoning, does not decide actions, and does not execute processing. It is limited to extraction and structuring.",
  "### Non Responsibilities",
  "Audio processing, tool execution, decision-making, and flow control.",
  "### Architectural Summary",
  "Content Scanner is the foundational extraction component of Analyzer, converting raw document content into structured, segmented, and interpretable text for downstream analysis.",
] as const;

const audioRecognizerBody = [
  "### Module Type",
  "Audio Analysis Component as an Analyzer submodule.",
  "### Purpose",
  "Convert raw audio input into structured, analyzable data by extracting speech, detecting segments and events, and identifying meaningful audio features.",
  "### Overview",
  "Audio Recognizer interprets audio content and transforms raw signals into structured representations such as transcription, segmented regions, detected events, and extracted features.",
  "This enables machine-readable understanding of audio for downstream modules.",
  "### Responsibilities",
  "Convert speech to text.",
  "Segment audio into regions and events.",
  "Detect relevant audio signals and patterns.",
  "Extract measurable audio features for analysis.",
  "Prepare structured audio data for downstream processing.",
  "### Core Capabilities",
  "Speech-to-Text: transcribe spoken content, support multi-speaker and continuous speech, and provide timestamps for alignment.",
  "Audio Segmentation: divide audio into logical regions and identify silence, speech, music, transitions, and key events.",
  "Signal Detection: identify peaks, noise, rhythm, anomalies, and other important acoustic markers.",
  "Audio Feature Extraction: extract frequency bands, amplitude, tempo/BPM, and spectral characteristics.",
  "### Flow",
  "Audio Input -> Speech-to-Text -> Segmentation -> Signal Detection -> Feature Extraction -> Structured Audio Output.",
  "### Inputs",
  "Normalized audio file, audio metadata such as duration and sample rate, and file reference.",
  "### Outputs",
  "Transcription with timestamps, segmented regions, detected events, extracted audio features, and audio analysis metadata.",
  "### Control Boundary",
  "Audio Recognizer does not perform reasoning, does not decide actions, and does not execute DSP. It only analyzes and extracts.",
  "### Non Responsibilities",
  "UI generation, tool execution, flow control, and decision-making.",
  "### Architectural Summary",
  "Audio Recognizer is the audio interpretation component of Analyzer, transforming raw audio signals into structured, segmented, and feature-rich data for intelligent downstream processing.",
] as const;

const systemDataParserBody = [
  "### Module Type",
  "Structured Data Interpretation Component as an Analyzer submodule.",
  "### Purpose",
  "Interpret structured and semi-structured data formats, extract metadata, parse content, and identify contextual attributes for downstream analysis.",
  "### Overview",
  "System Data Parser is responsible for understanding structured inputs such as JSON, CSV, and system-generated data.",
  "It converts raw structured data into normalized and interpretable representations so the system can extract meaning from metadata, schemas, and contextual attributes.",
  "### Responsibilities",
  "Extract metadata from files and systems.",
  "Parse structured formats such as JSON and CSV.",
  "Detect schemas and data structures.",
  "Identify contextual attributes.",
  "Normalize structured data for analysis.",
  "### Core Capabilities",
  "Metadata Extraction: extract timestamps, identifiers, format properties, and system-generated attributes.",
  "Structured Data Parsing: parse JSON/CSV-like data, traverse nested structures, and convert raw data into normalized objects.",
  "Format Detection: identify structure type automatically, detect schema patterns, and recognize organization models such as tables, trees, and key-value.",
  "Contextual Attribute Detection: identify meaningful fields, extract semantic attributes, and map data to relevant system context.",
  "### Flow",
  "Structured Input -> Format Detection -> Metadata Extraction -> Data Parsing -> Attribute Detection -> Normalized Structured Output.",
  "### Inputs",
  "Structured files such as JSON and CSV, metadata, system-generated data, and file reference.",
  "### Outputs",
  "Parsed data structure, extracted metadata, detected schema, contextual attributes, and normalized data representation.",
  "### Control Boundary",
  "System Data Parser does not perform reasoning, does not decide actions, and does not execute processing. It is limited to parsing and structuring.",
  "### Non Responsibilities",
  "Audio processing, UI generation, tool execution, flow control, and decision-making.",
  "### Architectural Summary",
  "System Data Parser is the structured-data interpretation component of Analyzer, transforming raw structured inputs into normalized and meaningful representations for downstream reasoning and processing.",
] as const;

const knowledgeFetcherBody = [
  "### Module Type",
  "Context Enrichment Component as an Analyzer submodule.",
  "### Purpose",
  "Enhance analysis results by retrieving relevant contextual information from internal and external knowledge sources.",
  "### Overview",
  "Knowledge Fetcher enriches the analysis process with additional context retrieved from related data sources.",
  "It enables deeper understanding for downstream modules without generating decisions.",
  "### Responsibilities",
  "Retrieve related contextual data.",
  "Query internal knowledge sources.",
  "Enrich analysis output with additional insights.",
  "Provide relevant background information.",
  "Support context-aware processing.",
  "### Core Capabilities",
  "Context Retrieval: identify relevant information from current input and fetch related content from memory or knowledge sources.",
  "Internal Data Querying: query internal datasets, prior results, metadata, and structured historical records.",
  "Context Enrichment: combine extracted signals with retrieved context to improve completeness of understanding.",
  "Relevance Filtering: keep high-value context, suppress noise, and prioritize useful supporting information.",
  "### Flow",
  "Analyzer Input / Partial Output -> Context Matching -> Knowledge Retrieval -> Relevance Filtering -> Context Enrichment -> Enhanced Output.",
  "### Inputs",
  "Partial analysis output, extracted features, structured data, system context, and memory references.",
  "### Outputs",
  "Enriched context, related data, supporting information, and augmented analysis structure.",
  "### Control Boundary",
  "Knowledge Fetcher does not perform reasoning, does not decide actions, and does not execute tools. It only enriches context.",
  "### Non Responsibilities",
  "Decision-making, flow control, UI generation, and DSP execution.",
  "### Architectural Summary",
  "Knowledge Fetcher is the context-enrichment component of Analyzer, retrieving and integrating relevant context to strengthen analysis outputs and enable deeper system understanding.",
] as const;

const featureExtractorBody = [
  "### Module Type",
  "Core Analysis Component as an Analyzer submodule.",
  "### Purpose",
  "Identify and extract meaningful signals, entities, patterns, anomalies, and relationships from analyzed input data.",
  "### Overview",
  "Feature Extractor is the core intelligence component of Analyzer.",
  "It processes structured outputs from prior analysis stages and turns them into high-level features for downstream reasoning, decision support, and execution planning.",
  "This is the stage where structured data becomes interpretable insights.",
  "### Responsibilities",
  "Extract entities from content.",
  "Detect recurring patterns and structures.",
  "Identify anomalies and irregularities.",
  "Discover relationships between elements.",
  "Convert structured data into meaningful feature sets.",
  "### Core Capabilities",
  "Entity Extraction: identify key entities such as names, objects, labels, and audio elements like segments and voices.",
  "Pattern Detection: detect repetitions, trends, sequences, and structural similarities.",
  "Anomaly Detection: identify outliers, inconsistencies, and irregular events.",
  "Relationship Identification: map dependencies, interactions, and relational context across entities.",
  "### Flow",
  "Structured Input -> Entity Extraction -> Pattern Detection -> Anomaly Detection -> Relationship Mapping -> Feature Set Output.",
  "### Inputs",
  "Structured analysis output, segmented data, metadata, and optional enriched context.",
  "### Outputs",
  "Extracted entities, detected patterns, identified anomalies, mapped relationships, and structured feature set.",
  "### Control Boundary",
  "Feature Extractor does not perform reasoning, does not decide actions, and does not execute operations. It only extracts meaning.",
  "### Non Responsibilities",
  "Tool execution, UI generation, flow control, and LLM reasoning.",
  "### Architectural Summary",
  "Feature Extractor is the core intelligence unit of Analyzer, transforming structured input into meaningful features that power higher-level reasoning and decision processes in QAgent.",
] as const;

const structureBuilderBody = [
  "### Module Type",
  "Output Structuring Component as an Analyzer submodule.",
  "### Purpose",
  "Unify all extracted analysis data into a consistent structured format ready for QCore reasoning and downstream processing.",
  "### Overview",
  "Structure Builder consolidates outputs from Analyzer submodules into a single normalized representation.",
  "It transforms fragmented analysis results into coherent structure that QCore can consume for decision and orchestration.",
  "### Responsibilities",
  "Combine outputs from all Analyzer components.",
  "Normalize data into a unified schema.",
  "Organize entities, features, and context.",
  "Ensure consistency and completeness.",
  "Prepare final analysis output.",
  "### Core Capabilities",
  "Data Aggregation: collect outputs from Content Scanner, Audio Recognizer, System Data Parser, Knowledge Fetcher, and Feature Extractor.",
  "Schema Normalization: convert data into one canonical structure with consistent field naming and aligned data types.",
  "Entity and Feature Organization: group related entities, structure features, and organize relationships and patterns.",
  "Context Integration: merge enriched context with extracted data while preserving continuity and logical coherence.",
  "Output Preparation: format final payload for QCore, verify readiness, and confirm structural completeness.",
  "### Flow",
  "Analyzer Submodules Output -> Data Aggregation -> Schema Normalization -> Feature and Entity Organization -> Context Integration -> Final Structured Output -> QCore.",
  "### Inputs",
  "Extracted text and segments, audio analysis data, structured parsed data, enriched context, and extracted features.",
  "### Outputs",
  "Unified structured object, normalized entities, organized features, contextualized data, and analysis-ready representation.",
  "### Control Boundary",
  "Structure Builder does not perform reasoning, does not decide actions, and does not execute tools. It only prepares structured output.",
  "### Non Responsibilities",
  "LLM reasoning, flow control, UI generation, and execution logic.",
  "### Architectural Summary",
  "Structure Builder is the final stage of Analyzer, transforming extracted and enriched data into a unified representation that enables effective reasoning and decision-making by QCore.",
] as const;

export function generateStaticParams() {
  return Object.keys(architectureModuleTitles).map((module) => ({ module }));
}

export default async function ArchitectureModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const title = architectureModuleTitles[module];

  if (!title) {
    return notFound();
  }

  if (module === "qagent-core") {
    const page = getDocPage("qcore");
    if (!page) return notFound();
    const primarySection = page.sections.find((section) => section.title === "Main QAgent Core Structure");
    const otherSections = page.sections.filter((section) => section.title !== "Main QAgent Core Structure");

    return (
      <DocsContent>
        <PageTitle title={page.title} description={page.description} />
        <div className="flex flex-col gap-5">
          {primarySection ? (
            <SectionBlock
              key={primarySection.title}
              title={primarySection.title}
              body={primarySection.body}
              collapsible
              plainStructured
            />
          ) : null}
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Architecture Diagram</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-sm leading-6 text-slate-300">
                  Circle-based architecture infographic with QCore as the center node and surrounding system layers.
                </p>
                <p className="rounded-md border border-[var(--border)] bg-slate-900/50 px-3 py-2 text-xs leading-5 text-slate-300">
                  Terminology note: <span className="font-semibold text-slate-100">QAgent Core</span> is the top-level architectural scope, while
                  <span className="font-semibold text-slate-100"> QCore Engine</span> is the internal runtime component at its center.
                </p>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--border)] bg-slate-900/40">
                  <Image src="/qcore-architecture-circle.png" alt="QCore central architecture diagram" fill className="object-contain" priority />
                </div>
                <details className="group/details rounded-lg border border-[var(--border)] bg-slate-950/40 p-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-slate-100 [&::-webkit-details-marker]:hidden">
                    <span>Diagram Components</span>
                    <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
                  </summary>
                  <div className="mt-3">
                    <DiagramComponentsAccordion />
                  </div>
                </details>
              </div>
            </details>
          </section>
          {otherSections.map((section) => (
            <SectionBlock
              key={section.title}
              title={section.title}
              body={section.body}
              childrenFirst={section.title === "QCore Engine" || section.title === "LLM Interface Layer"}
              collapsible
            >
              {section.title === "QCore Engine" ? <QCoreInternalDiagram /> : null}
              {section.title === "LLM Interface Layer" ? <LlmInterfaceDiagram /> : null}
            </SectionBlock>
          ))}
        </div>
      </DocsContent>
    );
  }

  if (module === "files-handler") {
    return (
      <DocsContent>
        <PageTitle
          title="Files Handler"
          description="Input gateway module responsible for ingestion, validation, normalization, and preparation of incoming files."
        />
        <div className="flex flex-col gap-5">
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Architecture Diagram</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3">
                <FilesHandlerDiagram />
              </div>
            </details>
          </section>

          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Files Handler Overview</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {filesHandlerOverviewBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`files-handler-overview-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`files-handler-overview-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {(() => {
                        const separatorIndex = line.indexOf(":");
                        const hasLabel =
                          separatorIndex > 0 &&
                          !line.includes("->") &&
                          /^[A-Za-z][A-Za-z\s/&-]+$/.test(line.slice(0, separatorIndex).trim());
                        if (!hasLabel) return line;
                        const label = line.slice(0, separatorIndex).trim();
                        const rest = line.slice(separatorIndex + 1).trim();
                        return (
                          <>
                            <strong className="text-slate-100">{label}:</strong>{" "}
                            {rest}
                          </>
                        );
                      })()}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Input Gateway</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {inputGatewaySpecificationBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`input-gateway-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`input-gateway-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">File Validator</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {fileValidatorSpecificationBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`file-validator-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`file-validator-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">File Normalizer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {fileNormalizerSpecificationBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`file-normalizer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`file-normalizer-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">File Metadata Extractor</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {fileMetadataExtractorSpecificationBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`file-metadata-extractor-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`file-metadata-extractor-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">File Storage Manager</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {fileStorageManagerSpecificationBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`file-storage-manager-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`file-storage-manager-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">File Registry</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {fileRegistrySpecificationBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`file-registry-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`file-registry-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
        </div>
      </DocsContent>
    );
  }

  if (module === "analyzer") {
    return (
      <DocsContent>
        <PageTitle
          title="Analyzer"
          description="Interpretation module that transforms normalized inputs into structured, feature-rich representations for downstream reasoning."
        />
        <div className="flex flex-col gap-5">
          <SectionBlock title="Architecture Diagram" body={[]} collapsible>
            <AnalyzerModuleDiagram />
          </SectionBlock>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Analyzer Module Structure</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {analyzerModuleStructureBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`analyzer-structure-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`analyzer-structure-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Content Scanner</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {contentScannerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`content-scanner-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`content-scanner-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Audio Recognizer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {audioRecognizerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`audio-recognizer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`audio-recognizer-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">System Data Parser</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {systemDataParserBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`system-data-parser-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`system-data-parser-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Knowledge Fetcher</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {knowledgeFetcherBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`knowledge-fetcher-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`knowledge-fetcher-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Feature Extractor</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {featureExtractorBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`feature-extractor-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`feature-extractor-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Structure Builder</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {structureBuilderBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`structure-builder-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`structure-builder-line-${index}`} className="text-sm leading-6 text-slate-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </details>
          </section>
        </div>
      </DocsContent>
    );
  }

  return (
    <DocsContent>
      <PageTitle
        title={title}
        description=""
      />
      <div className="flex flex-col gap-5">
        {placeholderSections.map((sectionTitle) => (
          <SectionBlock
            key={sectionTitle}
            title={sectionTitle}
            body={[]}
            collapsible
          />
        ))}
      </div>
    </DocsContent>
  );
}





import { ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { DocsContent } from "@/components/layout/DocsContent";
import { AnalyzerModuleDiagram } from "@/components/ui/AnalyzerModuleDiagram";
import { ApprovalModuleDiagram } from "@/components/ui/ApprovalModuleDiagram";
import { DalModuleDiagram } from "@/components/ui/DalModuleDiagram";
import { DiagramComponentsAccordion } from "@/components/ui/DiagramComponentsAccordion";
import { DspEngineDiagram } from "@/components/ui/DspEngineDiagram";
import FilesHandlerDiagram from "@/components/ui/FilesHandlerDiagram";
import { IntentClarificationDiagram } from "@/components/ui/IntentClarificationDiagram";
import { LlmInterfaceDiagram } from "@/components/ui/LlmInterfaceDiagram";
import { PageTitle } from "@/components/ui/PageTitle";
import { QCoreArchitectureDiagram } from "@/components/ui/QCoreArchitectureDiagram";
import { QCoreInternalDiagram } from "@/components/ui/QCoreInternalDiagram";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { UAgentModuleDiagram } from "@/components/ui/UAgentModuleDiagram";
import { VersioningModuleDiagram } from "@/components/ui/VersioningModuleDiagram";
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

const intentClarificationBody = [
  "### Goal",
  "Define Intent + Clarification as the reasoning interface responsible for interpreting user intent and resolving ambiguity before planning and execution.",
  "### Overview",
  "Intent + Clarification is the first reasoning stage in the system.",
  "It receives structured analysis from Analyzer and determines what the user wants, what action is required, and whether intent is clear or ambiguous.",
  "When ambiguity exists, the layer produces clarification requests before progression.",
  "### Module Type",
  "Reasoning Preparation Layer serving as the intent resolution system.",
  "### Purpose",
  "Interpret user intent from input and context, map intent to actionable goals, detect ambiguity or missing information, generate clarifications when needed, and ensure readiness for DAL.",
  "### Internal Structure",
  "Intent Resolver: performs intent classification, goal identification, and mapping of input to action types.",
  "Context Interpreter: combines analyzer output with memory, session, and context signals.",
  "Ambiguity Detector: detects missing parameters, conflicting signals, and multi-interpretation cases.",
  "Clarification Generator: produces missing-data questions, user options, and structured prompts.",
  "Intent Validator: checks completeness, consistency, and compatibility with system capabilities.",
  "Intent Structurer: emits structured intent object, goal definition, and required parameters.",
  "### Flow",
  "Analyzer Output + User Input -> Intent Resolver -> Context Interpreter -> Ambiguity Detection -> Clarification (if needed) -> Intent Validation -> Intent Structuring -> Structured Intent Output -> DAL.",
  "### Inputs",
  "Analyzer structured output, user input, memory and history, and session context.",
  "### Outputs",
  "Structured intent object, identified goal, required parameters, and clarification request when needed.",
  "### Control Boundary",
  "This layer interprets intent and prepares it for decision-making. It does not execute actions.",
  "### Non Responsibilities",
  "Tool execution, flow control, DSP processing, and UI rendering.",
  "### System Behavior",
  "The layer must guarantee clear intent before planning, resolve ambiguity early, produce consistent structured intent, and remain ready for DAL ingestion.",
  "### Failure Handling",
  "Unclear intent triggers clarification, conflicting signals trigger resolution or clarification, and missing data triggers explicit input requests.",
  "### Architectural Summary",
  "Intent + Clarification is the reasoning-preparation stage of QAgent, translating user input and analyzed data into clear, structured, actionable intent before planning and execution.",
  "### Validation",
  "Intent resolution, ambiguity handling, clarification support, structured output readiness, and DAL readiness are all defined.",
  "### Deep Insight",
  "System quality depends on this boundary: when ambiguity is resolved before planning, downstream orchestration becomes deterministic instead of reactive.",
] as const;

const intentResolverBody = [
  "### Module Type",
  "Intent Interpretation Component as an Intent + Clarification submodule.",
  "### Purpose",
  "Identify and classify user intent, define the underlying goal, and map input into actionable system-level action types.",
  "### Overview",
  "Intent Resolver translates user input and analyzed data into a clear structured intent.",
  "It determines what the user is trying to achieve and aligns that intent with system capabilities through defined action categories.",
  "This is the first step in transforming input into executable logic.",
  "### Responsibilities",
  "Perform intent classification.",
  "Identify user goals.",
  "Map input to action types.",
  "Interpret high-level user requests.",
  "Prepare intent for validation and clarification.",
  "### Core Capabilities",
  "Intent Classification: categorize user intent into predefined types such as analyze, transform, enhance, generate, and modify.",
  "Goal Identification: determine objective and desired outcomes behind each request.",
  "Action Mapping: align intent with supported system action types and capabilities.",
  "Multi-Intent Handling: detect multiple intents in one input and prioritize or split when needed.",
  "### Flow",
  "User Input + Analyzer Output -> Intent Classification -> Goal Identification -> Action Mapping -> Structured Intent Signal.",
  "### Inputs",
  "User input, analyzer structured data, optional context, and optional memory or history.",
  "### Outputs",
  "Intent type, identified goal, mapped action type, and structured intent signal.",
  "### Control Boundary",
  "Intent Resolver does not validate completeness, does not generate clarifications, and does not execute actions. It only identifies and maps intent.",
  "### Non Responsibilities",
  "Ambiguity resolution, tool selection, flow control, and execution.",
  "### Architectural Summary",
  "Intent Resolver is the core interpretation component of Intent + Clarification, converting input into structured intent signals through classification, goal identification, and action mapping.",
] as const;

const contextInterpreterBody = [
  "### Module Type",
  "Context Integration Component as an Intent + Clarification submodule.",
  "### Purpose",
  "Combine analyzer output with memory, session data, and contextual signals to produce unified context-aware input for intent resolution.",
  "### Overview",
  "Context Interpreter builds coherent situational understanding by merging multiple context sources.",
  "It ensures user input is interpreted with prior interactions, session state, historical data, and relevant environment signals instead of isolation.",
  "This improves intent interpretation accuracy and context awareness.",
  "### Responsibilities",
  "Merge analyzer output with contextual data.",
  "Integrate memory and session history.",
  "Align input with current system state.",
  "Resolve contextual dependencies.",
  "Prepare enriched context for intent resolution.",
  "### Core Capabilities",
  "Context Aggregation: combine analyzer output, memory, session data, and system state into one context view.",
  "Session Awareness: track active session state and preserve continuity across interactions.",
  "Memory Integration: retrieve relevant historical data and incorporate prior decisions and outputs.",
  "Context Alignment: align new input with existing context, resolve inconsistencies, and preserve coherence.",
  "Context Enrichment: add contextual signals to provide richer representation for intent processing.",
  "### Flow",
  "Analyzer Output + User Input -> Context Aggregation -> Memory Integration -> Session Awareness -> Context Alignment -> Unified Context Object.",
  "### Inputs",
  "Analyzer structured output, user input, memory data, session state, and system context.",
  "### Outputs",
  "Unified context object, enriched input representation, and context-aware data structure.",
  "### Control Boundary",
  "Context Interpreter does not classify intent, does not detect ambiguity, and does not generate clarification. It only builds context.",
  "### Non Responsibilities",
  "Decision-making, tool execution, flow control, and UI generation.",
  "### Architectural Summary",
  "Context Interpreter is the context-integration component of Intent + Clarification, merging analyzer output with memory and session signals to provide unified context-aware input for intent resolution.",
] as const;

const ambiguityDetectorBody = [
  "### Module Type",
  "Ambiguity Detection Component as an Intent + Clarification submodule.",
  "### Purpose",
  "Identify unclear, incomplete, or conflicting intent signals and determine whether clarification is required before progression.",
  "### Overview",
  "Ambiguity Detector prevents progression under uncertain understanding.",
  "It evaluates resolved intent and context for missing parameters, conflicting signals, and multiple valid interpretations.",
  "When ambiguity is detected, progression pauses and clarification is triggered.",
  "### Responsibilities",
  "Detect missing or incomplete input parameters.",
  "Identify conflicting context or instruction signals.",
  "Recognize multiple valid interpretations.",
  "Evaluate intent clarity level.",
  "Trigger clarification when necessary.",
  "### Core Capabilities",
  "Missing Parameter Detection: identify required but absent fields and incomplete instructions.",
  "Conflict Detection: detect contradictions and incompatible instructions across input and context.",
  "Multi-Interpretation Detection: flag cases where language or structure supports multiple interpretations.",
  "Clarity Scoring: optionally assign confidence to intent clarity and support threshold-based clarification decisions.",
  "### Flow",
  "Structured Intent + Context -> Parameter Check -> Conflict Detection -> Multi-Interpretation Detection -> Clarity Evaluation -> Clear or Ambiguous Decision.",
  "### Inputs",
  "Structured intent signal, unified context object, analyzer output, and memory/session data.",
  "### Outputs",
  "Ambiguity status, missing parameters, detected conflicts, interpretation candidates, and clarification trigger signal.",
  "### Control Boundary",
  "Ambiguity Detector does not resolve ambiguity, does not generate clarification content, and does not execute actions. It only detects and flags.",
  "### Non Responsibilities",
  "Intent classification, tool selection, flow control, and execution.",
  "### Architectural Summary",
  "Ambiguity Detector is the validation component of Intent + Clarification, ensuring the system does not proceed without clear and complete intent understanding.",
] as const;

const clarificationGeneratorBody = [
  "### Module Type",
  "User Interaction Component as an Intent + Clarification submodule.",
  "### Purpose",
  "Generate clear structured clarification prompts to resolve ambiguity by requesting missing information, presenting options, and guiding input completion.",
  "### Overview",
  "Clarification Generator is activated when ambiguity is detected.",
  "It converts ambiguity signals into actionable questions and structured prompts so users can provide required missing information.",
  "This ensures progression only with complete and accurate intent.",
  "### Responsibilities",
  "Generate questions for missing parameters.",
  "Present options for ambiguous interpretations.",
  "Create structured clarification prompts.",
  "Guide user input toward completeness.",
  "Enable controlled user interaction for intent completion.",
  "### Core Capabilities",
  "Missing Data Questions: produce targeted questions for required parameters and essential missing fields.",
  "Option Generation: present multiple valid interpretations and support explicit user selection.",
  "Structured Prompt Creation: keep prompt format consistent, clear, and simple for reliable responses.",
  "Interaction Guidance: control presentation style, avoid overload, and prioritize usability and clarity.",
  "### Flow",
  "Ambiguity Detected -> Identify Missing or Conflicting Elements -> Generate Questions or Options -> Format Structured Prompt -> Send to User -> Receive Clarification -> Return to Intent Flow.",
  "### Inputs",
  "Ambiguity detection result, missing parameters, conflicting signals, interpretation candidates, and context data.",
  "### Outputs",
  "Clarification questions, selectable options, structured prompts, and user interaction payload.",
  "### Control Boundary",
  "Clarification Generator does not resolve ambiguity internally, does not decide final intent, and does not execute actions. It only communicates with the user.",
  "### Non Responsibilities",
  "Intent classification, decision-making, tool execution, and flow control.",
  "### Architectural Summary",
  "Clarification Generator is the user-interaction component of Intent + Clarification, converting ambiguity into structured prompts that enable complete and accurate intent resolution.",
] as const;

const intentValidatorBody = [
  "### Module Type",
  "Intent Validation Component as an Intent + Clarification submodule.",
  "### Purpose",
  "Ensure resolved intent is complete, consistent, and compatible with system capabilities before progression to planning in DAL.",
  "### Overview",
  "Intent Validator verifies that interpreted intent is valid and actionable.",
  "It serves as the final checkpoint before transitioning from understanding to planning.",
  "Only validated intents are allowed downstream.",
  "### Responsibilities",
  "Verify intent completeness.",
  "Ensure internal consistency.",
  "Validate compatibility with system capabilities.",
  "Confirm readiness for planning.",
  "Block invalid or unsupported intents.",
  "### Core Capabilities",
  "Completeness Check: verify required parameters exist, critical data is present, and input sufficiency is achieved.",
  "Consistency Check: detect contradictions, validate logical coherence, and confirm alignment between context and intent.",
  "Capability Validation: ensure requested actions are supported by available system tools and modules.",
  "Readiness Verification: confirm ambiguity is resolved and intent is ready for DAL transition.",
  "### Flow",
  "Structured Intent -> Completeness Check -> Consistency Check -> Capability Validation -> Readiness Verification -> Valid or Invalid Decision.",
  "### Inputs",
  "Structured intent object, context data, system capabilities, and analyzer output.",
  "### Outputs",
  "Validation result, validation status, missing or invalid elements, and readiness signal for next stage.",
  "### Control Boundary",
  "Intent Validator does not resolve ambiguity, does not generate clarification, and does not execute actions. It only validates intent.",
  "### Non Responsibilities",
  "Intent classification, tool execution, flow control, and UI generation.",
  "### Architectural Summary",
  "Intent Validator is the final validation component of Intent + Clarification, ensuring intent is complete, consistent, and capability-compatible before progression to DAL planning.",
] as const;

const intentStructurerBody = [
  "### Module Type",
  "Intent Structuring Component as an Intent + Clarification submodule.",
  "### Purpose",
  "Transform validated intent into a structured standardized representation consumable by DAL for planning and execution.",
  "### Overview",
  "Intent Structurer converts validated intent into a well-defined machine-readable structure.",
  "It organizes goal, parameters, and context in a consistent format for seamless transition to planning.",
  "### Responsibilities",
  "Build structured intent object.",
  "Define clear goal representation.",
  "Organize required parameters.",
  "Normalize intent data.",
  "Prepare output for DAL.",
  "### Core Capabilities",
  "Intent Object Construction: create standardized machine-readable intent object with consistent schema.",
  "Goal Definition: translate user objective into actionable goal aligned with system capabilities.",
  "Parameter Structuring: extract and organize required parameters for downstream planning use.",
  "Schema Normalization: enforce unified structure, consistent field naming, and stable format across intent types.",
  "Context Packaging: attach relevant analyzer and memory signals to preserve full intent scope.",
  "### Flow",
  "Validated Intent -> Goal Definition -> Parameter Structuring -> Schema Normalization -> Context Packaging -> Structured Intent Object -> DAL.",
  "### Inputs",
  "Validated intent, context data, parameters, analyzer output, and memory signals.",
  "### Outputs",
  "Structured intent object, goal definition, required parameters, and normalized intent schema.",
  "### Control Boundary",
  "Intent Structurer does not validate intent, does not perform reasoning, and does not execute actions. It only structures data.",
  "### Non Responsibilities",
  "Ambiguity detection, clarification generation, tool execution, and flow control.",
  "### Architectural Summary",
  "Intent Structurer is the final component of Intent + Clarification, converting validated intent into normalized structured representation for seamless DAL planning and execution.",
] as const;

const dalLayerBody = [
  "### Goal",
  "Define DAL as the planning layer that transforms structured intent into a system-executable plan composed of actions, tools, and UI representation.",
  "### Overview",
  "DAL is the system planning engine.",
  "It receives structured intent from Intent Structurer and converts it into actionable steps, tool execution plan, and UI representation plan.",
  "DAL defines what should be done and does not execute actions.",
  "### Module Type",
  "Planning Layer serving as the action abstraction system.",
  "### Purpose",
  "Translate intent into actionable plans, define execution steps, map actions to tools, build UI representation plan, and prepare the system for execution.",
  "### Internal Structure",
  "Action Planner: performs action breakdown, step sequencing, and goal decomposition.",
  "Tool Mapper: maps planned actions to system tools and capabilities.",
  "Execution Graph Builder: defines dependencies, order, and sequential or parallel structure.",
  "UI Plan Generator: defines UI blocks, visual representation, and user interaction elements.",
  "Constraint Resolver: enforces system limits, tool compatibility, and execution constraints.",
  "Plan Formatter: emits structured DAL output with execution and UI planning integration.",
  "### Flow",
  "Structured Intent -> Action Planning -> Tool Mapping -> Execution Graph Building -> UI Plan Generation -> Constraint Resolution -> Plan Formatting -> DAL Output.",
  "### Inputs",
  "Structured intent object, goal definition, parameters, context, and system capabilities.",
  "### Outputs",
  "Action plan, tool mapping, execution graph, UI plan, and structured DAL object.",
  "### Control Boundary",
  "DAL defines what should happen and does not execute. It is planning-only.",
  "### Non Responsibilities",
  "Execution by DAgent, LLM reasoning decisions, state management, and UI rendering.",
  "### System Behavior",
  "DAL must ensure complete actionable plans, logical execution order, capability alignment, and execution readiness.",
  "### Failure Handling",
  "Unsupported action triggers plan adjustment, missing parameters trigger clarification request, and invalid mapping triggers fallback strategy.",
  "### Architectural Summary",
  "DAL is the planning engine of QAgent, converting structured intent into an actionable structured plan defining actions, execution model, and representation.",
  "### Validation",
  "Plan creation, action definition, tool mapping, execution graph building, and UI plan generation are all defined.",
] as const;

const actionPlannerBody = [
  "### Module Type",
  "Planning Component as a DAL submodule.",
  "### Purpose",
  "Decompose structured intent into a sequence of actionable steps that define how the system should achieve the user goal.",
  "### Overview",
  "Action Planner translates high-level intent into a structured action sequence.",
  "It breaks goals into manageable steps, determines ordering, and defines logical progression for outcome delivery.",
  "### Responsibilities",
  "Perform action breakdown.",
  "Define step-by-step execution plan.",
  "Decompose goals into smaller tasks.",
  "Establish logical sequencing.",
  "Prepare actions for tool mapping.",
  "### Core Capabilities",
  "Action Breakdown: split high-level intent into discrete operations and ensure full action coverage.",
  "Step Sequencing: define execution order, dependencies, and sequential versus parallel flow.",
  "Goal Decomposition: break complex goals into actionable sub-goals while preserving alignment to overall objective.",
  "Dependency Identification: map inter-action relationships and prevent invalid transition ordering.",
  "### Flow",
  "Structured Intent -> Goal Decomposition -> Action Breakdown -> Dependency Identification -> Step Sequencing -> Action Plan.",
  "### Inputs",
  "Structured intent object, goal definition, parameters, and context.",
  "### Outputs",
  "Action list, step sequence, sub-goals, dependency map, and structured action plan.",
  "### Control Boundary",
  "Action Planner does not execute actions, does not select tools, and does not generate UI. It only defines what must be done.",
  "### Non Responsibilities",
  "Tool execution, UI rendering, flow control, and reasoning decisions.",
  "### Architectural Summary",
  "Action Planner is the core decomposition engine of DAL, transforming goals into structured ordered actions that define how outcomes are achieved.",
] as const;

const toolMapperBody = [
  "### Module Type",
  "Mapping Component as a DAL submodule.",
  "### Purpose",
  "Map planned actions to concrete system tools and capabilities so each action is executable within system boundaries.",
  "### Overview",
  "Tool Mapper translates abstract actions into executable operations.",
  "It aligns each planned action with the right tool, validates compatibility, and prepares action-to-tool definitions for execution.",
  "### Responsibilities",
  "Map actions to system tools.",
  "Align actions with available capabilities.",
  "Ensure tool compatibility.",
  "Prepare tool-level execution definitions.",
  "Validate mapping feasibility.",
  "### Core Capabilities",
  "Action-to-Tool Mapping: match each planned action to the appropriate tool and keep mapping consistency.",
  "Capability Alignment: verify tool support for required actions and match requirements to capabilities.",
  "Tool Selection Logic: choose best tool when alternatives exist, using context, constraints, performance, and fallback strategy.",
  "Execution Preparation: define tool usage model, prepare tool-level parameters, and structure execution-ready instructions.",
  "### Flow",
  "Action Plan -> Action-to-Tool Mapping -> Capability Alignment -> Tool Selection -> Execution Preparation -> Mapped Tool Plan.",
  "### Inputs",
  "Action plan, system capabilities, available tools, and context.",
  "### Outputs",
  "Mapped tools, per-action tool assignments, execution-ready definitions, and tool-mapping structure.",
  "### Control Boundary",
  "Tool Mapper does not execute tools, does not define action logic, and does not control flow. It only maps actions to tools.",
  "### Non Responsibilities",
  "Action planning, UI generation, execution by DAgent, and reasoning.",
  "### Architectural Summary",
  "Tool Mapper is the DAL mapping component that converts planned actions into executable operations by aligning them with tools and capabilities.",
] as const;

const executionGraphBuilderBody = [
  "### Module Type",
  "Execution Structuring Component as a DAL submodule.",
  "### Purpose",
  "Define execution structure of planned actions by establishing dependencies, execution order, and sequential versus parallel behavior.",
  "### Overview",
  "Execution Graph Builder organizes mapped actions into a structured execution graph.",
  "It determines action relationships, ordering, and concurrency boundaries to enable correct and efficient DAgent execution.",
  "### Responsibilities",
  "Define dependencies between actions.",
  "Establish execution order.",
  "Determine sequential versus parallel execution.",
  "Build execution graph structure.",
  "Ensure logical and valid execution flow.",
  "### Core Capabilities",
  "Dependency Definition: identify prerequisites and prevent invalid execution sequences.",
  "Order Structuring: define valid progression aligned with the action plan.",
  "Parallelization Logic: detect actions that can run concurrently while preserving safety constraints.",
  "Graph Construction: represent actions as nodes and dependencies as edges in execution-ready format.",
  "### Flow",
  "Mapped Tool Plan -> Dependency Analysis -> Order Structuring -> Parallelization Detection -> Graph Construction -> Execution Graph.",
  "### Inputs",
  "Mapped tool plan, action plan, dependencies, and system constraints.",
  "### Outputs",
  "Execution graph, action dependencies, execution order, and parallel execution groups.",
  "### Control Boundary",
  "Execution Graph Builder does not execute actions, does not select tools, and does not perform reasoning. It only structures execution.",
  "### Non Responsibilities",
  "Action planning, tool execution, UI generation, and flow control.",
  "### Architectural Summary",
  "Execution Graph Builder is the DAL structural component that organizes actions into dependency-aware execution graphs defining how and when each action runs.",
] as const;

const uiPlanGeneratorBody = [
  "### Module Type",
  "UI Planning Component as a DAL submodule.",
  "### Purpose",
  "Define how planned actions and execution flow are represented visually to users through UI blocks and interaction elements.",
  "### Overview",
  "UI Plan Generator translates execution logic into visual and interactive representation.",
  "It defines how state, actions, and outcomes appear in the Canvas so users can understand, interact with, and control process progression.",
  "### Responsibilities",
  "Define UI blocks from action plan.",
  "Create visual representation of execution flow.",
  "Design user interaction elements.",
  "Align UI with system state and actions.",
  "Prepare UI structure for rendering.",
  "### Core Capabilities",
  "UI Block Definition: map actions to visual blocks and define component layout structure.",
  "Visual Representation: render execution steps, action relationships, system state, and progress indicators in plan form.",
  "Interaction Design: define controls such as buttons, sliders, and inputs for guided user interaction.",
  "State Visualization: represent execution status and user-facing progress feedback.",
  "UI Structure Mapping: map execution graph semantics into consistent UI layout model.",
  "### Flow",
  "Execution Graph -> UI Block Definition -> Visual Representation Mapping -> Interaction Design -> UI Structure Assembly -> UI Plan.",
  "### Inputs",
  "Execution graph, action plan, system state, and context.",
  "### Outputs",
  "UI blocks, layout structure, interaction elements, and UI plan object.",
  "### Control Boundary",
  "UI Plan Generator does not render UI, does not execute actions, and does not control flow. It only defines UI.",
  "### Non Responsibilities",
  "UI rendering by UAgent, tool execution, reasoning, and state management.",
  "### Architectural Summary",
  "UI Plan Generator is the DAL visual-planning component that converts execution logic into structured UI representations for transparency and user interaction.",
] as const;

const constraintResolverBody = [
  "### Module Type",
  "Constraint Validation Component as a DAL submodule.",
  "### Purpose",
  "Ensure generated execution plans comply with system limits, tool compatibility, and operational constraints before execution.",
  "### Overview",
  "Constraint Resolver validates execution-plan feasibility.",
  "It checks planned actions, tool mappings, and execution structures against system constraints to ensure plans are safe, valid, and executable.",
  "### Responsibilities",
  "Enforce system limits.",
  "Validate tool compatibility.",
  "Ensure execution feasibility.",
  "Detect constraint violations.",
  "Adjust or reject invalid plans.",
  "### Core Capabilities",
  "System Limit Enforcement: validate resource usage, execution time, and concurrency boundaries.",
  "Tool Compatibility Validation: ensure chosen tools support required actions and data combinations.",
  "Execution Constraint Checking: validate dependencies, sequencing conditions, and safe parallel execution readiness.",
  "Plan Adjustment: apply fallback strategies and simplify or modify plan where needed.",
  "Constraint Violation Detection: detect invalid configurations, flag critical issues, and block unsafe execution.",
  "### Flow",
  "Execution Plan -> System Limit Check -> Tool Compatibility Check -> Execution Constraint Validation -> Valid Continue or Invalid Adjust/Reject -> Validated Plan.",
  "### Inputs",
  "Execution plan, tool mappings, execution graph, system capabilities, and constraint definitions.",
  "### Outputs",
  "Validated plan, adjusted plan when needed, constraint validation result, and constraint violation report.",
  "### Control Boundary",
  "Constraint Resolver does not execute actions, does not define intent, and does not generate UI. It only validates and adjusts plans.",
  "### Non Responsibilities",
  "Action planning, tool execution, UI rendering, and reasoning.",
  "### Architectural Summary",
  "Constraint Resolver is the DAL validation component that ensures execution plans are feasible, safe, and compliant before downstream execution.",
] as const;

const planFormatterBody = [
  "### Module Type",
  "Output Structuring Component as a DAL submodule.",
  "### Purpose",
  "Generate unified structured DAL output that integrates execution planning and UI planning into a single machine-readable format.",
  "### Overview",
  "Plan Formatter is the final stage of DAL.",
  "It consolidates action plan, tool mappings, execution graph, and UI plan into one standardized structure.",
  "This output is consumed by downstream modules such as UAgent for UI handling and DAgent for execution.",
  "### Responsibilities",
  "Aggregate all DAL components.",
  "Normalize plan structure.",
  "Integrate execution and UI planning.",
  "Ensure consistency and completeness.",
  "Prepare final DAL output.",
  "### Core Capabilities",
  "Plan Aggregation: combine outputs from Action Planner, Tool Mapper, Execution Graph Builder, UI Plan Generator, and Constraint Resolver.",
  "Structure Normalization: enforce unified schema, consistent naming, and alignment between execution and UI structures.",
  "Execution Integration: embed execution graph with action definitions and tool mappings for execution readiness.",
  "UI Plan Integration: attach UI representation with blocks and interaction elements aligned to execution steps.",
  "Output Validation: validate completeness, internal consistency, and downstream readiness.",
  "### Flow",
  "DAL Components Output -> Plan Aggregation -> Structure Normalization -> Execution Integration -> UI Plan Integration -> Output Validation -> Structured DAL Output.",
  "### Inputs",
  "Action plan, tool mappings, execution graph, UI plan, and validated constraints.",
  "### Outputs",
  "Structured DAL object, execution plan, UI plan, and integrated system plan.",
  "### Control Boundary",
  "Plan Formatter does not execute actions, does not perform reasoning, and does not render UI. It only formats final output.",
  "### Non Responsibilities",
  "Action planning, tool execution, UI rendering, and flow control.",
  "### Architectural Summary",
  "Plan Formatter is the final DAL component, consolidating all planning outputs into a unified structured representation that integrates execution and UI planning for downstream processing.",
] as const;

const uAgentLayerBody = [
  "### Goal",
  "Define UAgent as the runtime layer responsible for rendering, managing, and updating UI based on DAL output.",
  "### Overview",
  "UAgent is the system UI execution layer.",
  "It receives UI plan from DAL and turns it into a live interactive Canvas where users can view system actions, interact with flow, adjust parameters, and approve or refine operations.",
  "### Module Type",
  "UI Runtime Layer serving as the UI Execution Agent.",
  "### Purpose",
  "Render UI from DAL plan, manage interactive components, reflect real-time system state, enable user control, and bridge users with execution system.",
  "### Internal Structure",
  "UI Renderer: renders UI blocks, generates layout, and instantiates components.",
  "Interaction Handler: captures clicks, sliders, inputs, and user adjustments.",
  "State Sync Layer: synchronizes UI with runtime state through refresh and real-time reflection logic.",
  "Event Dispatcher: sends interaction events, parameter updates, and approval signals back to QCore.",
  "Component Registry: maintains available UI blocks, component definitions, and UI-plan-to-component mapping.",
  "Feedback Layer: surfaces loading states, execution progress, and error messages to users.",
  "### Flow",
  "DAL Output (UI Plan) -> UI Renderer -> Rendered Interface -> User Interaction -> Interaction Handler -> Event Dispatcher -> QCore.",
  "### Inputs",
  "UI plan from DAL, execution state, system context, and updates from QCore.",
  "### Outputs",
  "Rendered UI, user interaction events, updated parameters, and approval signals.",
  "### Control Boundary",
  "UAgent does not decide and does not execute logic. It only presents and mediates interaction.",
  "### Non Responsibilities",
  "Reasoning, action planning, tool execution, and source-of-truth state management.",
  "### System Behavior",
  "UAgent must keep UI aligned with real system state, keep interactions responsive and clear, capture user actions reliably, and synchronize updates with execution.",
  "### Failure Handling",
  "Missing UI elements trigger fallback rendering, interaction errors return user feedback, and state mismatches trigger resynchronization.",
  "### Architectural Summary",
  "UAgent is QAgent UI runtime agent, responsible for rendering and managing interface, enabling user interaction, and bridging planning output with user control during execution.",
] as const;

const uIRendererBody = [
  "### Module Type",
  "Rendering Component as a UAgent submodule.",
  "### Purpose",
  "Render UI blocks, generate layout structure, and instantiate components based on DAL UI plan.",
  "### Overview",
  "UI Renderer transforms abstract UI plan definitions into concrete visual interface.",
  "It converts planned UI definitions into Canvas components while preserving layout structure, hierarchy, and visual consistency.",
  "### Responsibilities",
  "Render UI blocks.",
  "Generate layout structure.",
  "Instantiate UI components.",
  "Align UI with plan definitions.",
  "Ensure visual consistency.",
  "### Core Capabilities",
  "UI Block Rendering: render planned blocks, map block types to components, and keep visual representation accurate.",
  "Layout Generation: build layout from plan structure, position elements, and preserve hierarchy and relationships.",
  "Component Instantiation: dynamically instantiate components, bind data, and initialize component state.",
  "Plan-to-UI Mapping: translate UI plan schema into renderable component tree aligned with intended output.",
  "Visual Consistency Enforcement: keep styling, structure, and behavior uniform across components.",
  "### Flow",
  "UI Plan -> UI Block Mapping -> Layout Generation -> Component Instantiation -> Rendered UI.",
  "### Inputs",
  "UI plan from DAL, component definitions, and system state.",
  "### Outputs",
  "Rendered UI components, layout structure, and initialized UI elements.",
  "### Control Boundary",
  "UI Renderer does not handle interactions, does not manage source-of-truth state, and does not execute actions. It only renders UI.",
  "### Non Responsibilities",
  "Interaction handling, event dispatching, reasoning, and execution.",
  "### Architectural Summary",
  "UI Renderer is the UAgent rendering component that converts UI plans into structured visual interfaces through layout generation and component instantiation.",
] as const;

const interactionHandlerBody = [
  "### Module Type",
  "Interaction Management Component as a UAgent submodule.",
  "### Purpose",
  "Capture and process user interactions such as clicks, sliders, inputs, and adjustments, and translate them into structured interaction events.",
  "### Overview",
  "Interaction Handler manages all user interactions within the UI runtime.",
  "It listens to user actions, interprets their meaning, and converts them into structured signals for dispatch back to QCore.",
  "### Responsibilities",
  "Capture user interactions.",
  "Interpret interaction intent.",
  "Normalize interaction data.",
  "Prepare interaction events.",
  "Enable real-time user control.",
  "### Core Capabilities",
  "Interaction Capture: capture clicks, sliders, text inputs, toggles, and drag-and-drop events.",
  "Event Interpretation: map UI actions to system signals and identify affected parameters.",
  "Input Normalization: convert raw UI input into consistent structured event format.",
  "Parameter Update Handling: detect parameter changes and package user adjustments for downstream state updates.",
  "Real-Time Interaction Support: support immediate responses and continuous interactions such as slider movement.",
  "### Flow",
  "User Interaction -> Event Capture -> Event Interpretation -> Input Normalization -> Structured Interaction Event -> Event Dispatcher.",
  "### Inputs",
  "User actions, UI components, and current UI state.",
  "### Outputs",
  "Structured interaction events, parameter updates, and user input signals.",
  "### Control Boundary",
  "Interaction Handler does not execute actions, does not make decisions, and does not manage source-of-truth system state. It only captures and translates interactions.",
  "### Non Responsibilities",
  "UI rendering, reasoning, tool execution, and flow control.",
  "### Architectural Summary",
  "Interaction Handler is the UAgent interaction-management component that captures user actions and converts them into structured events for system updates and execution pathways.",
] as const;

const stateSyncLayerBody = [
  "### Module Type",
  "State Synchronization Component as a UAgent submodule.",
  "### Purpose",
  "Synchronize UI with runtime system state to ensure accurate real-time reflection of execution, data, and context changes.",
  "### Overview",
  "State Sync Layer keeps UI aligned with actual runtime behavior.",
  "It ensures changes in execution, data, and context are reflected immediately so the user-facing interface remains consistent with backend reality.",
  "### Responsibilities",
  "Synchronize UI with runtime state.",
  "Reflect real-time system updates.",
  "Trigger UI refresh on state changes.",
  "Maintain consistency between UI and backend.",
  "Handle state updates across components.",
  "### Core Capabilities",
  "Real-Time State Reflection: update UI from system state changes and reflect progress and outcomes.",
  "UI Refresh Logic: trigger re-rendering only when needed and optimize refresh frequency.",
  "State Binding: bind components to state values and maintain reactive data flow behavior.",
  "Consistency Enforcement: prevent UI-state mismatches and maintain cross-module synchronization coherence.",
  "Incremental Updates: apply partial updates to reduce render overhead and improve responsiveness.",
  "### Flow",
  "System State Change -> State Sync Layer -> Update Detection -> UI Binding Update -> UI Refresh -> Synchronized UI.",
  "### Inputs",
  "Runtime state updates, execution status, context changes, and parameter updates.",
  "### Outputs",
  "Updated UI state, refreshed components, and synchronized visual representation.",
  "### Control Boundary",
  "State Sync Layer does not initiate actions, does not perform reasoning, and does not execute tools. It only synchronizes UI.",
  "### Non Responsibilities",
  "UI rendering by UI Renderer, interaction capture, decision-making, and execution.",
  "### Architectural Summary",
  "State Sync Layer is the UAgent synchronization component ensuring real-time alignment between runtime state and UI for consistent and accurate user experience.",
] as const;

const eventDispatcherBody = [
  "### Overview",
  "Event Dispatcher sends interaction events, parameter updates, and approval signals back to QCore.",
] as const;

const componentRegistryBody = [
  "### Overview",
  "Component Registry maintains available UI blocks, component definitions, and UI-plan-to-component mapping.",
] as const;

const feedbackLayerBody = [
  "### Overview",
  "Feedback Layer surfaces loading states, execution progress, and error messages to users.",
] as const;

const approvalLayerBody = [
  "### Module Type",
  "Control Gate Layer serving as user-controlled execution guard.",
  "### Purpose",
  "Ensure critical actions are explicitly approved by the user through UI, while enforcement remains in QCore for safe controlled execution.",
  "### Overview",
  "Approval introduces human validation into execution flow.",
  "Users review planned actions from DAL/UI and explicitly approve, reject, or modify before execution.",
  "Approval interaction is triggered in UI, but enforcement is strictly handled by QCore.",
  "### Responsibilities",
  "Present approval requests to users.",
  "Capture user approval or rejection.",
  "Block execution until approval is granted.",
  "Enforce approval logic at core level.",
  "Maintain control over sensitive or impactful actions.",
  "### Core Capabilities",
  "Approval Triggering: identify approval-required actions, trigger approval UI, and surface relevant plan details.",
  "User Confirmation Handling: capture approve, reject, and modify decisions.",
  "Core Enforcement: prevent execution without authorization and block unauthorized transitions.",
  "Approval State Tracking: track status per action, store approval history, and support multi-step approvals.",
  "Conditional Approval Logic: define when approval is mandatory through rule-based levels.",
  "### Flow",
  "DAL Output / UI Plan -> Approval Trigger -> User Review -> User Decision -> QCore Enforcement -> Proceed / Block / Adjust.",
  "### Inputs",
  "Execution plan, UI plan, system rules, and user interaction.",
  "### Outputs",
  "Approval status, user decision, execution permission signal, and updated plan when modified.",
  "### Control Boundary",
  "UI triggers approval and QCore enforces approval, preserving strict separation between interaction and control.",
  "### Non Responsibilities",
  "Action planning, tool execution, UI rendering by UAgent, and reasoning.",
  "### System Behavior",
  "No critical action executes without approval, user visibility remains clear, approval flow stays consistent, and control remains with user.",
  "### Failure Handling",
  "Missing approval blocks execution, rejection cancels or adjusts plan, and unclear decision triggers clarification request.",
  "### Architectural Summary",
  "Approval is the control gate of QAgent, ensuring critical actions are explicitly authorized by user while enforcement remains in QCore for integrity and safety.",
] as const;

const approvalTriggeringBody = [
  "### Module Type",
  "Trigger Component as an Approval submodule.",
  "### Purpose",
  "Identify actions requiring user approval, trigger approval interface, and surface relevant plan details for informed decision-making.",
  "### Overview",
  "Approval Triggering detects where approval is needed within execution plans.",
  "It identifies sensitive or impactful actions, initiates approval flow in UI, and exposes the relevant context for user review.",
  "### Responsibilities",
  "Identify approval-required actions.",
  "Trigger approval UI.",
  "Surface relevant plan details.",
  "Prepare approval context.",
  "Initiate approval flow.",
  "### Core Capabilities",
  "Approval Requirement Detection: detect actions requiring approval through rules, thresholds, and risk or impact profile.",
  "Approval UI Trigger: activate approval interface in UAgent and initiate user-visible interaction flow.",
  "Plan Detail Surfacing: highlight key actions, impacts, and plan sections for decision clarity.",
  "Context Preparation: package actions, parameters, and expected outcomes into structured approval payload.",
  "Conditional Trigger Logic: support dynamic approval rules and multiple approval levels.",
  "### Flow",
  "Execution Plan -> Approval Requirement Detection -> Approval Context Preparation -> Trigger Approval UI -> Display Plan Details to User.",
  "### Inputs",
  "Execution plan, UI plan, system rules, and action metadata.",
  "### Outputs",
  "Approval request, approval context payload, and UI trigger signal.",
  "### Control Boundary",
  "Approval Triggering does not enforce approval, does not capture user decision, and does not execute actions. It only triggers approval.",
  "### Non Responsibilities",
  "Approval enforcement by QCore, interaction handling by UAgent, execution, and planning.",
  "### Architectural Summary",
  "Approval Triggering is responsible for detecting when user approval is required and initiating approval flow by activating UI and surfacing relevant execution context.",
] as const;

const userConfirmationHandlingBody = [
  "### Module Type",
  "Interaction Processing Component as an Approval submodule.",
  "### Purpose",
  "Capture and interpret user decisions during approval flow, including approve, reject, and modify actions, and convert them into structured signals for QCore.",
  "### Overview",
  "User Confirmation Handling processes user responses to approval requests.",
  "It captures user decisions and translates them into structured signals that determine whether execution proceeds, stops, or is adjusted.",
  "### Responsibilities",
  "Capture user decisions.",
  "Interpret approval responses.",
  "Normalize decision data.",
  "Prepare decision signals for QCore.",
  "Enable controlled execution flow.",
  "### Core Capabilities",
  "Decision Capture: capture user actions such as approve, reject, and modify.",
  "Decision Interpretation: determine outcome of user decisions and identify impact on execution flow.",
  "Input Normalization: convert user input into standardized format and ensure consistent decision structure.",
  "Modification Handling: capture user changes to plan, identify updated parameters, and prepare updates for re-processing.",
  "Decision Signal Emission: emit structured decision object enabling QCore enforcement.",
  "### Flow",
  "Approval UI -> User Decision (Approve / Reject / Modify) -> Decision Capture -> Decision Interpretation -> Input Normalization -> Structured Decision Signal -> QCore.",
  "### Inputs",
  "User interaction from approval UI, approval request context, and execution plan.",
  "### Outputs",
  "Decision signal, updated parameters when modified, and structured decision object.",
  "### Control Boundary",
  "User Confirmation Handling does not enforce execution, does not plan actions, and does not render UI. It only captures and translates user decisions.",
  "### Non Responsibilities",
  "Approval triggering, DAgent execution, reasoning, and flow control.",
  "### Architectural Summary",
  "User Confirmation Handling captures and structures user decisions during approval process, enabling controlled system progression based on explicit user intent.",
] as const;

const coreEnforcementBody = [
  "### Module Type",
  "Control Enforcement Component in Approval submodule with QCore integration.",
  "### Purpose",
  "Enforce execution control by preventing unauthorized actions and blocking transitions that were not explicitly approved.",
  "### Overview",
  "Core Enforcement ensures no execution occurs without valid authorization.",
  "It operates inside QCore as final gatekeeper before execution, validating approvals and allowed transitions to preserve safety and integrity.",
  "### Responsibilities",
  "Prevent execution without approval.",
  "Block unauthorized transitions.",
  "Enforce approval requirements.",
  "Validate execution permissions.",
  "Maintain system control integrity.",
  "### Core Capabilities",
  "Authorization Enforcement: verify approval status per action and block execution when missing.",
  "Transition Control: validate allowed transitions and prevent unauthorized progression.",
  "Execution Gatekeeping: act as final checkpoint that allows or blocks execution signals.",
  "Approval State Verification: validate approval completeness including multi-step approval paths.",
  "Security and Integrity Protection: prevent unauthorized operations and enforce defined system rules.",
  "### Flow",
  "Execution Request -> Approval State Check -> Transition Validation -> Authorization Verification -> Approved Allow or Not Approved Block -> Execution Decision.",
  "### Inputs",
  "Execution request, approval status, system state, and flow rules.",
  "### Outputs",
  "Execution permission decision, enforcement result, and violation signal when blocked.",
  "### Control Boundary",
  "UI triggers approval, user provides decision, and QCore enforces. Enforcement exists only in QCore.",
  "### Non Responsibilities",
  "UI interaction, decision capture, action planning, and execution runtime.",
  "### Architectural Summary",
  "Core Enforcement is the final QCore control gate ensuring no action or transition executes without proper authorization, preserving system integrity and user control.",
] as const;

const approvalStateTrackingBody = [
  "### Module Type",
  "State Management Component as an Approval submodule.",
  "### Purpose",
  "Track approval state per action, maintain approval history, and support multi-step approval workflows across the system.",
  "### Overview",
  "Approval State Tracking manages the lifecycle of approvals.",
  "It preserves persistent state per action, records historical decisions, and supports dependent multi-step approval flows for traceability and control.",
  "### Responsibilities",
  "Track approval status per action.",
  "Store approval history.",
  "Manage multi-step approval flows.",
  "Maintain approval state consistency.",
  "Provide approval data to QCore.",
  "### Core Capabilities",
  "Per-Action State Tracking: maintain states including pending, approved, rejected, and modified.",
  "Approval History Logging: store decision timeline for traceability and auditing.",
  "Multi-Step Approval Support: handle conditional or sequential approval dependencies.",
  "State Consistency Management: synchronize approval states with QCore and Flow Controller and prevent invalid transitions.",
  "Approval Data Access: provide current approval state to QCore for validation and enforcement decisions.",
  "### Flow",
  "Approval Trigger -> User Decision -> Update Approval State -> Store in History -> Update System State -> Provide State to QCore.",
  "### Inputs",
  "Approval requests, user decisions, execution plan, and system context.",
  "### Outputs",
  "Approval state per action, approval history, approval status signals, and state updates.",
  "### Control Boundary",
  "Approval State Tracking does not enforce execution, does not generate approval requests, and does not perform reasoning. It only tracks and manages approval state.",
  "### Non Responsibilities",
  "Approval triggering, decision capture, execution, and planning.",
  "### Architectural Summary",
  "Approval State Tracking manages approval states across the system, ensuring accurate tracking, historical logging, and support for complex approval workflows.",
] as const;

const conditionalApprovalLogicBody = [
  "### Module Type",
  "Rule-Based Control Component as an Approval submodule.",
  "### Purpose",
  "Define when user approval is required by applying rule-based logic that evaluates action sensitivity, system impact, and execution context.",
  "### Overview",
  "Conditional Approval Logic determines whether each action requires user approval.",
  "It applies configurable rules and thresholds to classify operations by risk, impact, and importance so only critical actions trigger approval.",
  "### Responsibilities",
  "Define approval rules.",
  "Determine when approval is mandatory.",
  "Classify actions by sensitivity level.",
  "Apply rule-based decision logic.",
  "Enable dynamic approval conditions.",
  "### Core Capabilities",
  "Rule Definition: configure approval conditions and flexible policy logic.",
  "Sensitivity Classification: classify actions into levels such as low, medium, and high with corresponding approval strictness.",
  "Context-Aware Evaluation: evaluate approval needs by action type, data sensitivity, and current system state.",
  "Dynamic Approval Levels: support multiple approval tiers and scenario-specific requirements.",
  "Threshold-Based Logic: apply thresholds such as resource usage, execution complexity, and potential impact.",
  "### Flow",
  "Execution Plan -> Rule Evaluation -> Sensitivity Classification -> Context Analysis -> Approval Decision -> Trigger or Skip Approval.",
  "### Inputs",
  "Execution plan, action metadata, system rules, and context data.",
  "### Outputs",
  "Approval requirement decision, approval level, and approval trigger signal.",
  "### Control Boundary",
  "Conditional Approval Logic does not trigger UI directly, does not enforce approval, and does not execute actions. It only decides if approval is needed.",
  "### Non Responsibilities",
  "Approval triggering, user interaction, execution, and planning.",
  "### Architectural Summary",
  "Conditional Approval Logic determines when user approval is required by rule-based evaluation so only appropriate operations enter approval flow.",
] as const;

const dspEngineDocBody = [
  "### Goal",
  "Define the DSP Engine inside DAgent as a Web Audio based execution engine for DAL DSP chains.",
  "It supports real-time preview through AudioContext and offline export rendering through OfflineAudioContext.",
  "### Overview",
  "DSP Engine maps abstract DAL actions into concrete audio processing nodes and executes chain-based processing in browser runtime.",
  "It prepares processed audio for playback and file export without backend dependency.",
  "### Runtime Context",
  "Input: DAL execution plan containing DSP chain.",
  "Runtime: browser in Next.js frontend.",
  "Engine: pure Web Audio API.",
  "Modes: real-time preview and offline export rendering.",
  "### Core Architecture",
  "DSP Chain Interpreter: parses chain, validates nodes, and prepares normalized node configuration.",
  "Node Factory: maps DSP types to Web Audio nodes (low_shelf/high_shelf/peaking to BiquadFilter, gain to GainNode, compressor to DynamicsCompressor).",
  "Graph Builder: constructs sequential audio graph from AudioBufferSource through DSP nodes to destination.",
  "Execution Modes: real-time mode with AudioContext and export mode with OfflineAudioContext.",
  "Renderer: executes graph and returns processed buffer.",
  "Output Adapter: converts processed AudioBuffer into exportable WAV/Blob output.",
  "### Execution Flow",
  "DAL DSP Chain -> DSP Chain Interpreter -> Node Factory -> Graph Builder -> Execution Mode -> Renderer -> Processed AudioBuffer -> Output Adapter -> Final Output.",
  "### Implementation Scope",
  "Module path: src/shared/lib/audio-engine.",
  "Files: dsp-engine.ts, node-factory.ts, graph-builder.ts, renderer.ts, export-adapter.ts.",
  "### Validation Scenarios",
  "Verify EQ chain behavior, multi-node chaining, real-time preview, offline export, and invalid-node fallback behavior.",
  "### Constraints",
  "No backend, no external DSP libraries, pure Web Audio API, integrated with existing WaveQ flow.",
  "### Future Architecture",
  "Design remains extensible for future premium engine split: WebAudioEngine as default and WASM-based engine as advanced path.",
  "### Architectural Summary",
  "DSP Engine is DAgent audio execution subsystem that converts DAL DSP plans into executable browser audio graphs for preview and export while preserving modular runtime architecture.",
] as const;

const dspChainInterpreterBody = [
  "### Module Type",
  "Interpretation Component in DAgent DSP submodule.",
  "### Purpose",
  "Parse DSP chain from DAL, validate node definitions, and convert chain into normalized execution-ready configuration.",
  "### Overview",
  "DSP Chain Interpreter transforms abstract DSP instructions into structured validated format for DSP Engine runtime.",
  "It bridges planning output from DAL to executable configuration in DAgent.",
  "### Responsibilities",
  "Parse DSP chain input.",
  "Validate node definitions.",
  "Normalize node configuration.",
  "Ensure compatibility with DSP engine capabilities.",
  "Prepare execution-ready structure.",
  "### Core Capabilities",
  "Chain Parsing: read chain from DAL, extract node definitions, and determine processing sequence.",
  "Node Validation: validate node types, required parameters, and supported DSP operations.",
  "Configuration Normalization: standardize parameter naming, apply defaults, and unify structure across node types.",
  "Compatibility Enforcement: ensure nodes match available capabilities and reject unsupported configurations.",
  "Error Detection: detect malformed nodes, missing parameters, and emit structured error output.",
  "### Flow",
  "DAL DSP Chain -> Chain Parsing -> Node Validation -> Configuration Normalization -> Compatibility Check -> Normalized DSP Chain.",
  "### Inputs",
  "DSP chain from DAL, system capabilities, and supported node types.",
  "### Outputs",
  "Normalized DSP chain, validated node configurations, and error report when invalid.",
  "### Control Boundary",
  "DSP Chain Interpreter does not execute DSP, does not build graph, and does not render audio. It only prepares configuration.",
  "### Non Responsibilities",
  "Node creation in Node Factory, graph building, audio rendering, and execution.",
  "### Architectural Summary",
  "DSP Chain Interpreter is the DSP Engine entry component that converts abstract DSP instructions into validated normalized configuration ready for execution.",
] as const;

const nodeFactoryBody = [
  "### Module Type",
  "Node Creation Component in DAgent DSP submodule.",
  "### Purpose",
  "Map normalized DSP node types into concrete Web Audio API nodes and instantiate them with correct configuration.",
  "### Overview",
  "Node Factory converts abstract normalized DSP definitions into executable Web Audio nodes.",
  "It creates and configures filters, gain, compressors, and other supported nodes from interpreter output.",
  "### Responsibilities",
  "Map DSP types to Web Audio nodes.",
  "Instantiate audio nodes.",
  "Apply node parameters.",
  "Ensure correct node configuration.",
  "Support extensible node mapping.",
  "### Core Capabilities",
  "DSP Type Mapping: low_shelf, high_shelf, and peaking map to BiquadFilterNode; gain maps to GainNode; compressor maps to DynamicsCompressorNode with proper parameter fields.",
  "Node Instantiation: create nodes using AudioContext or OfflineAudioContext and initialize consistently.",
  "Parameter Application: apply normalized configuration to frequency, gain, Q, threshold, ratio, and related fields.",
  "Context Compatibility: support realtime AudioContext and export OfflineAudioContext.",
  "Extensibility: maintain mapping registry for new DSP types and future WASM/C++ extensions.",
  "### Flow",
  "Normalized DSP Node -> Type Mapping -> Node Creation -> Parameter Application -> Configured Audio Node.",
  "### Inputs",
  "Normalized DSP node, audio context, and node configuration.",
  "### Outputs",
  "Configured Web Audio node instance ready for graph assembly.",
  "### Control Boundary",
  "Node Factory does not connect nodes, does not execute audio, and does not manage graph. It only creates nodes.",
  "### Non Responsibilities",
  "Graph building, DSP execution, audio rendering, and plan interpretation.",
  "### Architectural Summary",
  "Node Factory translates normalized DSP definitions into concrete Web Audio nodes enabling DSP Engine graph construction and execution.",
] as const;

const graphBuilderBody = [
  "### Module Type",
  "Graph Construction Component in DAgent DSP submodule.",
  "### Purpose",
  "Construct sequential audio processing graph by connecting AudioBufferSource through DSP nodes to final destination.",
  "### Overview",
  "Graph Builder assembles audio processing pipeline from instantiated nodes.",
  "It connects node chain into valid signal flow from input source to realtime or offline destination.",
  "### Responsibilities",
  "Construct audio processing graph.",
  "Connect nodes in correct order.",
  "Define signal flow from source to destination.",
  "Ensure valid node connections.",
  "Prepare graph for execution.",
  "### Core Capabilities",
  "Source Initialization: create AudioBufferSourceNode, attach input buffer, and prepare source for playback or rendering.",
  "Sequential Node Connection: connect source and DSP nodes in chain order.",
  "Destination Routing: connect final node to AudioContext.destination or OfflineAudioContext.destination depending on mode.",
  "Dynamic Chain Handling: support variable-length chains including empty and single-node scenarios.",
  "Connection Validation: prevent disconnected graphs and validate signal continuity.",
  "### Flow",
  "AudioBuffer -> Create Source Node -> Connect DSP Nodes Sequentially -> Connect to Destination -> Constructed Audio Graph.",
  "### Inputs",
  "Audio buffer, instantiated DSP nodes, and audio context.",
  "### Outputs",
  "Connected audio graph, execution-ready node chain, and source node for start control.",
  "### Control Boundary",
  "Graph Builder does not create nodes, does not execute audio, and does not render output. It only builds graph.",
  "### Non Responsibilities",
  "DSP interpretation, node instantiation, audio rendering, and execution control.",
  "### Architectural Summary",
  "Graph Builder constructs source-to-destination DSP signal flow by connecting nodes into valid executable audio graph.",
] as const;

const executionModesBody = [
  "### Module Type",
  "Execution Strategy Component in DAgent DSP submodule.",
  "### Purpose",
  "Define and manage execution modes for DSP processing, supporting both real-time playback and offline rendering for export.",
  "### Overview",
  "Execution Modes decides how DSP graph is executed according to intent and context.",
  "It separates realtime interaction from offline rendering to optimize performance and output quality.",
  "### Responsibilities",
  "Select execution mode.",
  "Initialize appropriate audio context.",
  "Configure mode-specific graph execution.",
  "Ensure mode-specific behavior.",
  "Optimize performance per mode.",
  "### Core Capabilities",
  "Real-Time Mode: use AudioContext, start playback immediately, and support live parameter updates for preview and interactive adjustment.",
  "Offline Mode: use OfflineAudioContext, render full buffer, and produce high-quality processed output for export.",
  "Mode Selection Logic: choose mode based on user action, system request, and performance constraints.",
  "Context Initialization: initialize AudioContext or OfflineAudioContext according to selected mode.",
  "Execution Optimization: prioritize low latency in realtime mode and high accuracy in offline mode.",
  "### Realtime Flow",
  "AudioContext -> Build Graph -> Start Source -> Real-Time Playback.",
  "### Offline Flow",
  "OfflineAudioContext -> Build Graph -> Start Source -> Render Audio -> Processed Buffer.",
  "### Unified Flow",
  "Execution Request -> Mode Selection -> Initialize Context -> Build Graph -> Execute -> Output.",
  "### Inputs",
  "DSP graph, execution request, audio buffer, and runtime parameters.",
  "### Outputs",
  "Real-time playback in AudioContext mode and processed buffer in OfflineAudioContext mode.",
  "### Control Boundary",
  "Execution Modes does not build graph, does not create nodes, and does not export files. It only controls execution mode.",
  "### Non Responsibilities",
  "DSP interpretation, node creation, graph construction, and file export.",
  "### Architectural Summary",
  "Execution Modes enables flexible DSP runtime behavior by supporting both interactive realtime processing and accurate offline rendering for final outputs.",
] as const;

const rendererBody = [
  "### Module Type",
  "Execution Component in DAgent DSP submodule.",
  "### Purpose",
  "Execute constructed audio graph and return processed audio output as AudioBuffer.",
  "### Overview",
  "Renderer runs DSP graph using selected execution mode.",
  "It triggers processing pipeline, manages rendering lifecycle, and returns final processed result for realtime playback or offline export.",
  "### Responsibilities",
  "Execute audio graph.",
  "Start audio processing.",
  "Manage rendering lifecycle.",
  "Return processed output.",
  "Support both execution modes.",
  "### Core Capabilities",
  "Graph Execution: start processing pipeline after verifying graph connectivity and source readiness.",
  "Real-Time Execution: use AudioContext, start source immediately, and maintain continuous playback processing.",
  "Offline Rendering: use OfflineAudioContext and render complete processed buffer.",
  "Execution Lifecycle Management: initialize, start, monitor, and complete execution flow.",
  "Output Handling: return processed AudioBuffer for playback system or export adapter.",
  "### Flow",
  "Constructed Graph -> Select Execution Mode -> Start Source Node -> Execute Audio Processing -> Realtime Playback or Offline Render -> Processed AudioBuffer.",
  "### Inputs",
  "Constructed audio graph, audio context, source node, and execution mode.",
  "### Outputs",
  "Processed AudioBuffer, realtime playback result, and offline rendered buffer.",
  "### Control Boundary",
  "Renderer does not build graph, does not create nodes, and does not export files. It only executes DSP graph.",
  "### Non Responsibilities",
  "DSP interpretation, node instantiation, graph construction, and file encoding.",
  "### Architectural Summary",
  "Renderer is the DSP Engine execution component responsible for running audio processing graph and producing final processed audio output.",
] as const;

const outputAdapterBody = [
  "### Module Type",
  "Output Conversion Component in DAgent DSP submodule.",
  "### Purpose",
  "Convert processed AudioBuffer into exportable file format such as WAV or Blob for download, storage, and downstream processing.",
  "### Overview",
  "Output Adapter transforms raw processed buffer into standard exportable artifact.",
  "It encodes AudioBuffer into WAV and produces Blob or URL for playback, download, and versioned output handling.",
  "### Responsibilities",
  "Convert AudioBuffer to file format.",
  "Encode audio data into WAV.",
  "Generate Blob output.",
  "Provide downloadable file reference.",
  "Prepare output for Versioning.",
  "### Core Capabilities",
  "AudioBuffer Encoding: convert channel data to PCM and merge channels where required.",
  "WAV Encoding: build WAV header with sample rate, bit depth, and channel count then append PCM payload.",
  "Blob Generation: package encoded byte data into audio Blob object.",
  "URL Creation: produce object URL for download or preview workflows.",
  "Format Extensibility: maintain architecture path for future codecs including MP3, AAC, and FLAC.",
  "### Flow",
  "Processed AudioBuffer -> Extract Channel Data -> PCM Conversion -> WAV Encoding -> Blob Creation -> Exportable Output.",
  "### Inputs",
  "Processed AudioBuffer, sample rate, and channel data.",
  "### Outputs",
  "WAV Blob, downloadable URL, and encoded audio payload.",
  "### Control Boundary",
  "Output Adapter does not execute DSP, does not build graph, and does not manage playback. It only converts output.",
  "### Non Responsibilities",
  "DSP processing, execution control, UI rendering, and planning.",
  "### Architectural Summary",
  "Output Adapter converts processed audio into standard export format enabling reliable download, storage, and result lifecycle integration.",
] as const;

const versioningLayerBody = [
  "### Goal",
  "Define Versioning as system layer responsible for tracking, storing, and managing execution results, states, and history across workflow lifecycle.",
  "### Overview",
  "Versioning manages lifecycle of outputs and states.",
  "It ensures each execution result including audio, parameters, and decisions is saved, traceable, reversible, and comparable.",
  "This enables navigation between versions, restore of prior states, and visibility into system evolution.",
  "### Module Type",
  "State Persistence and History Layer.",
  "### Purpose",
  "Store execution outputs, track version history, support rollback and restore, maintain traceability, and enable version comparison.",
  "### Internal Structure",
  "Version Manager: create, update, and delete version lifecycle entries.",
  "Snapshot Builder: capture audio output, parameters, DSP chain, and metadata state snapshot.",
  "Storage Layer: persist audio blobs and structured metadata records.",
  "History Tracker: maintain timeline sequence, timestamps, and action history.",
  "Restore Engine: load version and restore DSP chain plus UI state context.",
  "Diff Engine: optional comparison for parameter changes, DSP chain differences, and audio deltas.",
  "### Flow",
  "Execution Result -> Snapshot Builder -> Version Manager -> Storage Layer -> History Tracker -> Version Stored.",
  "### Inputs",
  "Processed AudioBuffer or file, DSP chain, parameters, and execution metadata.",
  "### Outputs",
  "Version object, stored file reference, history record, and version ID.",
  "### Control Boundary",
  "Versioning does not execute DSP, does not plan actions, and does not render UI. It only manages state over time.",
  "### Non Responsibilities",
  "DAgent execution, UAgent rendering, and QCore reasoning.",
  "### System Behavior",
  "Each execution must create immutable traceable version entries, preserve consistent history, and support reliable restore.",
  "### Failure Handling",
  "Failed save triggers retry or fallback path, corrupted version is isolated, and missing data triggers partial restore strategy.",
  "### Architectural Summary",
  "Versioning captures, stores, and manages system states and outputs to provide traceability, recovery, and iterative workflows across QAgent.",
  "### Validation",
  "Version creation, state persistence, history tracking, restore support, and full traceability are defined.",
] as const;

const snapshotBuilderBody = [
  "### Module Type",
  "State Capture Component in Versioning submodule.",
  "### Purpose",
  "Capture complete and consistent system snapshot including audio output, DSP configuration, parameters, and metadata at a specific point in time.",
  "### Overview",
  "Snapshot Builder creates a full representation of runtime state after execution.",
  "It aggregates audio artifact, DSP chain, parameters, and metadata into structured snapshot for storage, restore, and comparison workflows.",
  "This snapshot is the foundation of version lifecycle.",
  "### Responsibilities",
  "Capture audio output.",
  "Capture DSP chain configuration.",
  "Capture parameters and settings.",
  "Capture metadata.",
  "Build unified snapshot object.",
  "### Core Capabilities",
  "Audio Capture: capture processed output and preserve reliable reference to AudioBuffer, Blob, or file artifact.",
  "DSP Chain Capture: preserve executed node sequence and parameters to guarantee reproducibility.",
  "Parameter Capture: capture user-defined values and UI-controlled settings to preserve full state.",
  "Metadata Capture: include contextual attributes such as timestamp, user, execution type, and related version identifier.",
  "Snapshot Structuring: combine all captured elements into one consistent schema ready for Version Manager.",
  "### Flow",
  "Execution Result -> Capture Audio Output -> Capture DSP Chain -> Capture Parameters -> Capture Metadata -> Build Snapshot Object -> Pass to Version Manager.",
  "### Inputs",
  "Processed audio output, DSP chain, parameters, and execution metadata.",
  "### Outputs",
  "Snapshot object, audio reference, and structured state representation.",
  "### Control Boundary",
  "Snapshot Builder does not manage version lifecycle, does not store data, and does not restore state. It only captures state.",
  "### Non Responsibilities",
  "Execution, storage, UI rendering, and planning.",
  "### Architectural Summary",
  "Snapshot Builder is the state-capture component of Versioning, responsible for creating complete state representations that enable version tracking, reliable restoration, and meaningful comparison.",
] as const;

const storageLayerBody = [
  "### Module Type",
  "Persistence Component in Versioning submodule.",
  "### Purpose",
  "Persist audio artifacts and structured metadata records in reliable scalable storage.",
  "### Overview",
  "Storage Layer stores all version-related data including audio outputs, metadata records, and snapshot references.",
  "It preserves durability, accessibility, and integrity so versions can be retrieved, restored, and tracked over time.",
  "### Responsibilities",
  "Store audio blobs and files.",
  "Store structured metadata records.",
  "Maintain references between stored assets.",
  "Ensure persistence and durability.",
  "Provide retrieval access.",
  "### Core Capabilities",
  "Audio Storage: store WAV and future audio formats through blob or file persistence with stable URL or ID references.",
  "Metadata Storage: store structured JSON metadata including DSP chain, parameters, version details, and timestamps.",
  "Data Linking: link stored audio and metadata so full snapshot reconstruction remains consistent.",
  "Retrieval Support: fetch audio and metadata for restore and playback workflows.",
  "Storage Abstraction: keep backend abstracted to support local development storage and cloud production storage.",
  "### Flow",
  "Snapshot Object -> Store Audio Blob -> Store Metadata Record -> Link Data -> Persist Storage -> Return Storage References.",
  "### Inputs",
  "Snapshot object, audio blob or file artifact, and structured metadata JSON.",
  "### Outputs",
  "Storage references such as IDs or URLs, persisted records, and retrieval handles.",
  "### Control Boundary",
  "Storage Layer does not manage version lifecycle, does not capture state, and does not render UI. It only stores and retrieves data.",
  "### Non Responsibilities",
  "Execution, DSP processing, planning, and UI handling.",
  "### Architectural Summary",
  "Storage Layer persists audio artifacts and structured metadata to enable reliable storage, retrieval, and full state reconstruction across version history.",
] as const;

const historyTrackerBody = [
  "### Module Type",
  "Timeline Management Component in Versioning submodule.",
  "### Purpose",
  "Maintain structured timeline of versions with sequence order, timestamps, and action history across system lifecycle.",
  "### Overview",
  "History Tracker organizes all versions into coherent timeline.",
  "It tracks creation time, action context behind each version, and relationships between versions to expose how the system evolves over time.",
  "This enables reliable traceability, navigation, and lifecycle comprehension.",
  "### Responsibilities",
  "Maintain version sequence.",
  "Track timestamps.",
  "Record action history.",
  "Organize timeline structure.",
  "Enable historical navigation.",
  "### Core Capabilities",
  "Timeline Sequencing: maintain ordered version list and preserve chronological integrity.",
  "Timestamp Tracking: record creation time and support temporal queries.",
  "Action History Logging: keep audit trail for DSP changes, parameter updates, and relevant user interactions.",
  "Version Linking: maintain parent-child relationships and prepare for future branching support.",
  "Navigation Support: support previous and next traversal, direct jump to version, and timeline browsing.",
  "### Flow",
  "Version Created -> Assign Timestamp -> Record Action Context -> Insert into Timeline -> Update Version Sequence -> History Updated.",
  "### Inputs",
  "Version ID, snapshot metadata, action context, and timestamps.",
  "### Outputs",
  "Version timeline, ordered history list, action logs, and navigation references.",
  "### Control Boundary",
  "History Tracker does not store files, does not manage version lifecycle, and does not capture state. It only organizes history.",
  "### Non Responsibilities",
  "Execution, UI rendering, DSP processing, and planning.",
  "### Architectural Summary",
  "History Tracker is the timeline-management component of Versioning, organizing versions with timestamps and action history to enable traceability and navigation through system evolution.",
] as const;

const restoreEngineBody = [
  "### Module Type",
  "State Restoration Component (Versioning Submodule).",
  "### Purpose",
  "Load a selected version and restore the full system state, including DSP chain, parameters, and UI context.",
  "### Overview",
  "The Restore Engine is responsible for reconstructing a previous system state from a stored version.",
  "It retrieves snapshot data, restores the DSP configuration, and rehydrates the UI so the user can continue working from that exact point.",
  "### Responsibilities",
  "Load version data.",
  "Restore DSP chain.",
  "Restore parameters and settings.",
  "Restore UI state context.",
  "Reconstruct working environment.",
  "### Core Capabilities",
  "Version Loading: retrieve version by ID and fetch snapshot, metadata, and audio reference.",
  "DSP Chain Restoration: rebuild DSP chain from snapshot, restore node sequence and parameters, and ensure compatibility with DSP Engine.",
  "Parameter Restoration: restore all user-defined parameters, reapply UI-controlled values, and ensure consistency across system.",
  "UI State Rehydration: restore UI layout and state, reconstruct canvas elements, and sync UI with restored data.",
  "Context Reconstruction: restore execution context, align system state with restored version, and enable seamless continuation.",
  "### Flow",
  "User Selects Version -> Load Version Data -> Retrieve Snapshot -> Restore DSP Chain -> Restore Parameters -> Rehydrate UI State -> System Restored.",
  "### Inputs",
  "Version ID, snapshot data, stored metadata, and audio reference.",
  "### Outputs",
  "Restored DSP chain, restored parameters, restored UI state, and reconstructed system context.",
  "### Control Boundary",
  "Restore Engine does not execute DSP, does not modify version history, and does not plan actions. It only restores state.",
  "### Non Responsibilities",
  "Execution, storage, UI rendering logic, and planning.",
  "### Architectural Summary",
  "The Restore Engine is the state restoration component of the Versioning layer, responsible for loading and reconstructing previous system states, enabling users to return to and continue from any point in the workflow.",
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
                <QCoreArchitectureDiagram />
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
          {primarySection ? (
            <SectionBlock
              key={primarySection.title}
              title={primarySection.title}
              body={primarySection.body}
              collapsible
              plainStructured
            />
          ) : null}
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

  if (module === "intent-clarification") {
    return (
      <DocsContent>
        <PageTitle
          title="Intent + Clarification"
          description="Reasoning preparation layer that resolves user intent and ambiguity before DAL planning and execution."
        />
        <div className="flex flex-col gap-5">
          <SectionBlock title="Architecture Diagram" body={[]} collapsible>
            <IntentClarificationDiagram />
          </SectionBlock>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Intent + Clarification Layer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {intentClarificationBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`intent-clarification-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`intent-clarification-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Intent Resolver</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {intentResolverBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`intent-resolver-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`intent-resolver-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Context Interpreter</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {contextInterpreterBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`context-interpreter-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`context-interpreter-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Ambiguity Detector</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {ambiguityDetectorBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`ambiguity-detector-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`ambiguity-detector-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Clarification Generator</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {clarificationGeneratorBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`clarification-generator-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`clarification-generator-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Intent Validator</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {intentValidatorBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`intent-validator-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`intent-validator-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Intent Structurer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {intentStructurerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`intent-structurer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`intent-structurer-line-${index}`} className="text-sm leading-6 text-slate-300">
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

  if (module === "dal") {
    return (
      <DocsContent>
        <PageTitle
          title="DAL"
          description="Decision Abstraction Layer that converts structured intent into actionable execution and UI plans."
        />
        <div className="flex flex-col gap-5">
          <SectionBlock title="Architecture Diagram" body={[]} collapsible>
            <DalModuleDiagram />
          </SectionBlock>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Decision Abstraction Layer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {dalLayerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`dal-layer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`dal-layer-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Action Planner</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {actionPlannerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`action-planner-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`action-planner-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Tool Mapper</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {toolMapperBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`tool-mapper-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`tool-mapper-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Execution Graph Builder</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {executionGraphBuilderBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`execution-graph-builder-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`execution-graph-builder-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">UI Plan Generator</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {uiPlanGeneratorBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`ui-plan-generator-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`ui-plan-generator-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Constraint Resolver</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {constraintResolverBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`constraint-resolver-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`constraint-resolver-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Plan Formatter</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {planFormatterBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`plan-formatter-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`plan-formatter-line-${index}`} className="text-sm leading-6 text-slate-300">
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

  if (module === "uagent") {
    return (
      <DocsContent>
        <PageTitle
          title="UAgent"
          description="UI runtime agent that renders DAL UI plans, captures interactions, and synchronizes live interface with execution state."
        />
        <div className="flex flex-col gap-5">
          <SectionBlock title="Architecture Diagram" body={[]} collapsible>
            <UAgentModuleDiagram />
          </SectionBlock>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">UAgent � UI Runtime Layer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {uAgentLayerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`uagent-layer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`uagent-layer-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">UI Renderer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {uIRendererBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`ui-renderer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`ui-renderer-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Interaction Handler</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {interactionHandlerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`interaction-handler-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`interaction-handler-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">State Sync Layer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {stateSyncLayerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`state-sync-layer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`state-sync-layer-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Event Dispatcher</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {eventDispatcherBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`event-dispatcher-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`event-dispatcher-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Component Registry</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {componentRegistryBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`component-registry-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`component-registry-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Feedback Layer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {feedbackLayerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`feedback-layer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`feedback-layer-line-${index}`} className="text-sm leading-6 text-slate-300">
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

  if (module === "approval") {
    return (
      <DocsContent>
        <PageTitle
          title="Approval"
          description="Control gate layer that requires explicit user authorization for critical actions, with enforcement handled by QCore."
        />
        <div className="flex flex-col gap-5">
          <SectionBlock title="Architecture Diagram" body={[]} collapsible>
            <ApprovalModuleDiagram />
          </SectionBlock>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Approval Layer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {approvalLayerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`approval-layer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`approval-layer-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Approval Triggering</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {approvalTriggeringBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`approval-triggering-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`approval-triggering-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">User Confirmation Handling</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {userConfirmationHandlingBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`user-confirmation-handling-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`user-confirmation-handling-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Core Enforcement</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {coreEnforcementBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`core-enforcement-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`core-enforcement-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Approval State Tracking</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {approvalStateTrackingBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`approval-state-tracking-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`approval-state-tracking-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Conditional Approval Logic</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {conditionalApprovalLogicBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`conditional-approval-logic-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`conditional-approval-logic-line-${index}`} className="text-sm leading-6 text-slate-300">
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

  if (module === "dagent") {
    return (
      <DocsContent>
        <PageTitle
          title="DAgent"
          description="Execution module responsible for running approved plans, including DSP chain execution and output generation."
        />
        <div className="flex flex-col gap-5">
          <SectionBlock title="Architecture Diagram" body={[]} collapsible>
            <DspEngineDiagram />
          </SectionBlock>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">DSP Engine (Web Audio Implementation)</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {dspEngineDocBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`dsp-engine-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`dsp-engine-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">DSP Chain Interpreter</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {dspChainInterpreterBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`dsp-chain-interpreter-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`dsp-chain-interpreter-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Node Factory</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {nodeFactoryBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`node-factory-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`node-factory-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Graph Builder</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {graphBuilderBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`graph-builder-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`graph-builder-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Execution Modes</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {executionModesBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`execution-modes-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`execution-modes-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Renderer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {rendererBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`renderer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`renderer-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Output Adapter</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {outputAdapterBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`output-adapter-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`output-adapter-line-${index}`} className="text-sm leading-6 text-slate-300">
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

  if (module === "versioning") {
    return (
      <DocsContent>
        <PageTitle
          title="Versioning"
          description="State persistence and history layer for storing execution outputs, tracking versions, and enabling restore across workflow iterations."
        />
        <div className="flex flex-col gap-5">
          <SectionBlock title="Architecture Diagram" body={[]} collapsible>
            <VersioningModuleDiagram />
          </SectionBlock>
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold md:text-lg">Versioning Layer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {versioningLayerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`versioning-layer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`versioning-layer-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Snapshot Builder</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {snapshotBuilderBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`snapshot-builder-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`snapshot-builder-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Storage Layer</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {storageLayerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`storage-layer-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`storage-layer-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">History Tracker</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {historyTrackerBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`history-tracker-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`history-tracker-line-${index}`} className="text-sm leading-6 text-slate-300">
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
                <h2 className="text-base font-semibold md:text-lg">Restore Engine</h2>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {restoreEngineBody.map((line, index) =>
                  line.startsWith("### ") ? (
                    <h3 key={`restore-engine-heading-${index}`} className="pt-2 text-sm font-semibold text-slate-100">
                      {line.replace(/^###\s+/, "").trim()}
                    </h3>
                  ) : (
                    <p key={`restore-engine-line-${index}`} className="text-sm leading-6 text-slate-300">
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





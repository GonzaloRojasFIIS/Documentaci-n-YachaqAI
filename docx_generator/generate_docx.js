const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageBreak, ExternalHyperlink
} = require('docx');
const fs = require('fs');
const path = require('path');

// ---- Image helper ----
function imgRun(filePath, widthPx, heightPx) {
  const buf = fs.readFileSync(filePath);
  return new ImageRun({
    data: buf,
    transformation: { width: widthPx, height: heightPx },
    type: 'png'
  });
}

// ---- Style helpers ----
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, font: 'Arial', size: 32, bold: true })]
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, font: 'Arial', size: 28, bold: true })]
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, font: 'Arial', size: 26, bold: true })]
  });
}
function h4(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_4,
    children: [new TextRun({ text, font: 'Arial', size: 24, bold: true })]
  });
}
function para(runs, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    ...opts,
    children: Array.isArray(runs) ? runs : [new TextRun({ text: runs, font: 'Arial', size: 22 })]
  });
}
function bold(text) { return new TextRun({ text, font: 'Arial', size: 22, bold: true }); }
function norm(text) { return new TextRun({ text, font: 'Arial', size: 22 }); }
function italic(text) { return new TextRun({ text, font: 'Arial', size: 22, italics: true }); }
function bullet(runs, level = 0) {
  return new Paragraph({
    numbering: { reference: 'bullets', level },
    spacing: { after: 80 },
    children: Array.isArray(runs) ? runs : [new TextRun({ text: runs, font: 'Arial', size: 22 })]
  });
}
function numbered(runs, ref = 'numbers') {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: Array.isArray(runs) ? runs : [new TextRun({ text: runs, font: 'Arial', size: 22 })]
  });
}
function sep() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '2E75B6', space: 1 } },
    spacing: { after: 200 },
    children: []
  });
}
function spacer() { return new Paragraph({ children: [], spacing: { after: 120 } }); }

// ---- Table helpers ----
const border = { style: BorderStyle.SINGLE, size: 1, color: 'AAAAAA' };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function headerCell(text, w) {
  return new TableCell({
    borders,
    width: { size: w, type: WidthType.DXA },
    shading: { fill: '2E75B6', type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [new Paragraph({
      children: [new TextRun({ text, font: 'Arial', size: 20, bold: true, color: 'FFFFFF' })]
    })]
  });
}
function dataCell(runs, w, shading = 'FFFFFF') {
  return new TableCell({
    borders,
    width: { size: w, type: WidthType.DXA },
    shading: { fill: shading, type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [new Paragraph({
      children: Array.isArray(runs) ? runs : [new TextRun({ text: runs, font: 'Arial', size: 19 })]
    })]
  });
}

// =========================================================
// BUILD DOCUMENT
// =========================================================

// Generate 1x1 transparent PNG placeholder dynamically
const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const diagPath = path.join(__dirname, 'diag1.png');
fs.writeFileSync(diagPath, Buffer.from(base64Png, 'base64'));

const diagImg = fs.readFileSync(diagPath);

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: '\u25E6', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1080, hanging: 360 } } } }
        ]
      },
      {
        reference: 'numbers',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: 'Arial', color: '1F3864' },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: '2E75B6', space: 1 } } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Arial', color: '2E75B6' },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: 'Arial', color: '1A5276' },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
      { id: 'Heading4', name: 'Heading 4', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial', color: '1B4F72' },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 3 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1440, right: 1080, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // ===== TITLE PAGE =====
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 2880, after: 240 },
        children: [new TextRun({ text: 'SISTEMA 4: INTELIGENCIA', font: 'Arial', size: 52, bold: true, color: '1F3864' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: 'Diseño del Sistema de Adaptaci\u00F3n y Vigilancia Estrat\u00E9gica', font: 'Arial', size: 30, italics: true, color: '2E75B6' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: 'Synapta \u2014 YachaqAI', font: 'Arial', size: 28, color: '555555' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 480 },
        children: [new TextRun({ text: 'Validaci\u00F3n Cap. 2 (P\u00E9rez R\u00EDos / Beer) \u2014 VSM Sistema 4', font: 'Arial', size: 22, italics: true, color: '888888' })]
      }),

      // Callout box as table
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [9026],
        rows: [new TableRow({ children: [new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 8, color: '2E75B6' }, bottom: { style: BorderStyle.SINGLE, size: 8, color: '2E75B6' }, left: { style: BorderStyle.SINGLE, size: 8, color: '2E75B6' }, right: { style: BorderStyle.SINGLE, size: 8, color: '2E75B6' } },
          width: { size: 9026, type: WidthType.DXA },
          shading: { fill: 'EBF5FB', type: ShadingType.CLEAR },
          margins: { top: 160, bottom: 160, left: 200, right: 200 },
          children: [new Paragraph({ children: [
            new TextRun({ text: 'Nota de Validaci\u00F3n: ', font: 'Arial', size: 21, bold: true, color: '1A5276' }),
            new TextRun({ text: 'Esta fase corresponde al dise\u00F1o del Sistema 4 (Inteligencia). Su prop\u00F3sito es estructurar la capacidad adaptativa de Synapta enfoc\u00E1ndose en el \u201Cafuera y el ma\u00F1ana\u201D [1], [2]. El S4 act\u00FAa como el sensor de variedad externa y modelador prospectivo de la organiz\u00F3n, asegurando que la startup se anticipe a disrupciones tecnol\u00F3gicas, regulatorias y de mercado antes de que afecten la viabilidad del presente (gobernado por el S3) [2], [5].', font: 'Arial', size: 21, color: '1A5276' })
          ]})]
        })]})],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== PARTE 1 =====
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: 'Parte 1: Fundamentaci\u00F3n y Captura de Variedad Externa', font: 'Arial', size: 32, bold: true, color: '1F3864' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '1. Introducci\u00F3n al dise\u00F1o del Sistema 4', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }),

      para([
        norm('El '),
        bold('Sistema 4 (Inteligencia)'),
        norm(' de Synapta es el \u00F3rgano responsable de la '),
        bold('adaptaci\u00F3n continua'),
        norm(' de la organizaci\u00F3n [1]. Su foco de atenci\u00F3n no es el funcionamiento cotidiano del \u201Caqu\u00ED y ahora\u201D, sino la exploraci\u00F3n activa y sistem\u00E1tica del \u201Call\u00E1 y entonces\u201D (los cambios tecnol\u00F3gicos en Inteligencia Artificial, las regulaciones del sistema educativo superior peruano y la evoluci\u00F3n del mercado de EdTech en Latinoam\u00E9rica) [3], [5].')
      ]),

      para([
        norm('En Synapta, el S4 tiene como misi\u00F3n capturar la complejidad y variedad del entorno futuro, procesarla y traducirla en alternativas estrat\u00E9gicas para que la Junta de Fundadores (S5) y la Direcci\u00F3n Operativa (S3) puedan tomar decisiones informadas sobre la viabilidad existencial de la empresa [2], [5]. F\u00EDsicamente, en las fases iniciales de la startup (Fase 1: MVP de 2-5 personas [9]), el S4 se implementa apoy\u00E1ndose en una '),
        bold('Sala de Operaciones Virtual'),
        norm(' y en '),
        bold('Modelos de Simulaci\u00F3n Din\u00E1mica (M2 y M5)'),
        norm(' para proyectar escenarios de viabilidad [2], [8].')
      ]),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: '1.1 Asignaci\u00F3n de Roles en la Fase 1 (Multiactividad)', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      para([norm('Debido a la restricci\u00F3n de recursos humanos en la Fase 1, las funciones del S4 se distribuyen de manera '), bold('multiactiva'), norm(' entre los miembros del equipo fundador, quienes act\u00FAan como transductores de sus \u00E1reas respectivas:')]),

      bullet([bold('CTO (S4 T\u00E9cnico):'), norm(' Responsable del radar tecnol\u00F3gico. Monitorea los avances cient\u00EDficos en procesamiento de lenguaje natural (NLP), embeddings, consumo de APIs de IA y el desarrollo de Small Language Models (SLMs).')]),
      bullet([bold('Head of Growth (S4 de Mercado):'), norm(' Responsable del radar comercial y de competidores. Monitorea las estrategias de tracci\u00F3n, Churn, CAC y lanzamientos competitivos en EdTech.')]),
      bullet([bold('CEO + Asesor Legal Externo (S4 Regulatorio e Institucional):'), norm(' Responsables del radar legal y de licenciamiento. Monitorean las directivas del Diario Oficial El Peruano, resoluciones de SUNEDU y disposiciones de la Autoridad Nacional de Protecci\u00F3n de Datos Personales (APDP).')]),

      spacer(), sep(),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '2. Fundamentaci\u00F3n de la necesidad del Sistema 4', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }),

      para([
        norm('El '),
        bold('Sistema 3 (Gesti\u00F3n Operativa)'),
        norm(' est\u00E1 dise\u00F1ado para optimizar y dar cohesi\u00F3n a las operaciones actuales del Sistema 1 [1]. Sin embargo, el S3 tiene l\u00EDmites estructurales y de capacidad cognitiva que hacen indispensable la existencia de un Sistema 4 independiente:')
      ]),

      numbered([bold('Sobrecarga Cognitiva (Ley de Miller):'), norm(' El S3 monitorea indicadores de desempe\u00F1o semanales, cuotas de gasto de APIs en tiempo real y la resoluci\u00F3n de incidentes de soporte [8], [17]. Seg\u00FAn la Ley de Miller, la capacidad de procesamiento de un tomador de decisiones est\u00E1 limitada a 7 \u00B1 2 fragmentos de informaci\u00F3n concurrentes [10]. Si el S3 tambi\u00E9n asumiera la vigilancia de papers, competidores y cambios regulatorios, colapsar\u00EDa bajo la variedad del entorno, cayendo en la patolog\u00EDa de la '), bold('Hipertrofia del S3'), norm(' [5].')]),
      numbered([bold('Esquizofrenia de la Gesti\u00F3n (Conflicto Presente-Futuro):'), norm(' Existe una tensi\u00F3n natural entre la estabilidad operativa (minimizar costos, estabilizar el c\u00F3digo del sprint en S3) y la adaptaci\u00F3n al cambio (migrar de infraestructura, adoptar nuevos LLMs en S4) [21]. El S4 act\u00FAa como el contrapeso formal del S3 en el homeostato del metasistema.')]),
      numbered([bold('Atenuaci\u00F3n de Variedad Externa:'), norm(' El S4 funciona como un filtro estrat\u00E9gico. Absorbe y modela la complejidad del mercado y la tecnolog\u00EDa '), italic('antes'), norm(' de que golpee al S3. Sin este filtro, el metasistema operar\u00EDa de forma puramente reactiva ante crisis [4], [7].')]),

      spacer(), sep(),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '3. Dise\u00F1o del sistema de vigilancia del entorno', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }),

      para([norm('Para vigilar el entorno EdTech en el Per\u00FA y LATAM, el S4 de Synapta implementa '), bold('radares estrat\u00E9gicos'), norm(' compuestos por sensores y transductores espec\u00EDficos organizados en dos bucles homeost\u00E1ticos fundamentales:')]),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: '3.1 Los Dos Lazos Homeost\u00E1ticos del S4', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      bullet([bold('Lazo Homeost\u00E1tico S4 \u2014 Entorno Presente:'), norm(' Regula el acoplamiento t\u00E1ctico y tecnol\u00F3gico inmediato. Su sensor es la telemetr\u00EDa automatizada del rendimiento de la app (latencia RAG, errores de API en Supabase/Sentry) y alertas de competidores inmediatos. Traduce las anomal\u00EDas en el backlog de la semana (sprint). Su cadencia es diaria o en tiempo real.')]),
      bullet([bold('Lazo Homeost\u00E1tico S4 \u2014 Entorno Futuro:'), norm(' Regula la viabilidad estrat\u00E9gica de mediano y largo plazo (2\u20135 a\u00F1os). Sus sensores son boletines de SUNEDU, papers de arXiv, reportes del Banco Mundial y tendencias de adopci\u00F3n de SLMs locales. Traduce estas tendencias en simulaciones din\u00E1micas y planes estrat\u00E9gicos plurianuales. Su cadencia es semanal o mensual.')]),

      spacer(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 80 },
        children: [new TextRun({ text: 'Figura 1: Lazos Homeost\u00E1ticos del S4 \u2014 Sensores, Transductores e Integraci\u00F3n', font: 'Arial', size: 20, italics: true, color: '555555' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new ImageRun({ data: diagImg, transformation: { width: 620, height: 400 }, type: 'png' })]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: '3.2 Radares Estr\u00E9gicos de Vigilancia', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      numbered([bold('Radar Tecnol\u00F3gico (IA y Arquitectura de Software):'), norm(' Monitorea la relaci\u00F3n costo/rendimiento de modelos fundacionales, APIs de parsers estructurados y algoritmos de repetici\u00F3n espaciada (SRS).')]),
      numbered([bold('Radar Regulatorio e Institucional (SUNEDU y Privacidad):'), norm(' Vigila las normativas sobre acreditaci\u00F3n de programas h\u00EDbridos/virtuales en Per\u00FA y las directivas de la Autoridad Nacional de Protecci\u00F3n de Datos Personales (APDP).')]),
      numbered([bold('Radar de Mercado y Competidores (EdTech):'), norm(' Monitorea las estrategias de monetizaci\u00F3n y caracter\u00EDsticas de competidores directos/indirectos (NotebookLM, Anki, RemNote y otros gestores de notas locales).')]),

      spacer(),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: '3.3 Matriz de Sensores, Transductores, Capacidad y Cadencia', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      // Sensor matrix table
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [1300, 1500, 1700, 1300, 1926, 1300],
        rows: [
          new TableRow({ children: [
            headerCell('Dimensi\u00F3n', 1300),
            headerCell('Sensor (Responsable VSM)', 1500),
            headerCell('Fuentes de Datos', 1700),
            headerCell('Cadencia', 1300),
            headerCell('Transductor', 1926),
            headerCell('Capacidad', 1300),
          ]}),
          new TableRow({ children: [
            dataCell([bold('Tecnol\u00F3gica')], 1300, 'F2F3F4'),
            dataCell('CTO (Sensor S4 T\u00E9cnico)', 1500),
            dataCell('Feeds arXiv (cs.CL), Vertex AI Pricing Console, Logs Supabase', 1700, 'F2F3F4'),
            dataCell('Diaria / Continua', 1300),
            dataCell('Traduce m\u00E9tricas t\u00E9cnicas a costo financiero por usuario activo', 1926, 'F2F3F4'),
            dataCell('Hasta 50,000 eventos de telemetr\u00EDa/d\u00EDa', 1300),
          ]}),
          new TableRow({ children: [
            dataCell([bold('Regulatoria')], 1300, 'F2F3F4'),
            dataCell('Head of Sales + Asesor Legal Externo', 1500),
            dataCell('Diario Oficial El Peruano, Resoluciones SUNEDU, Directivas APDP (Ley 29733)', 1700, 'F2F3F4'),
            dataCell('Semanal', 1300),
            dataCell('Traduce leyes a requisitos t\u00E9cnicos en el backlog de Ingenier\u00EDa', 1926, 'F2F3F4'),
            dataCell('M\u00E1x. 3 reportes legales/semana', 1300),
          ]}),
          new TableRow({ children: [
            dataCell([bold('Mercado y Competencia')], 1300, 'F2F3F4'),
            dataCell('Head of Growth (Sensor S4 de Mercado)', 1500),
            dataCell('Foros EdTech Latam, Google Alerts, Onboarding feedback YachaqAI', 1700, 'F2F3F4'),
            dataCell('Semanal', 1300),
            dataCell('Traduce movimientos de competidores en hip\u00F3tesis de producto y variaciones del CAC/LTV', 1926, 'F2F3F4'),
            dataCell('M\u00E1x. 5 an\u00E1lisis de competidores/mes', 1300),
          ]}),
        ]
      }),

      spacer(),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: '3.4 Benchmarking Multidimensional de Competidores', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      para([
        norm('Para realizar una planeaci\u00F3n estrat\u00E9gica robusta en el S4, es vital aclarar que '),
        bold('Google NotebookLM no representa la competencia directa de YachaqAI'),
        norm(', sino un competidor '),
        italic('indirecto'),
        norm(' en la categor\u00EDa de lectura asistida por IA. Los competidores directos en productividad acad\u00E9mica y retenci\u00F3n activa son '),
        bold('Anki'),
        norm(' y '),
        bold('RemNote'),
        norm(', mientras que '),
        bold('Notion AI'),
        norm(' lidera la gesti\u00F3n general de apuntes en la nube.')
      ]),

      spacer(),
      // Benchmark Table
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [1650, 1350, 1350, 1350, 1700, 1626],
        rows: [
          new TableRow({ children: [
            headerCell('Criterio', 1650),
            headerCell('Anki (Directo)', 1350),
            headerCell('RemNote (Directo)', 1350),
            headerCell('Notion AI (Directo)', 1350),
            headerCell('Google NotebookLM (Indirecto)', 1700),
            headerCell('YachaqAI (Synapta)', 1626),
          ]}),
          new TableRow({ children: [
            dataCell([bold('Enfoque Pedag\u00F3gico Core')], 1650, 'EBF5FB'),
            dataCell('Repetici\u00F3n Espaciada (SRS) pura', 1350),
            dataCell('SRS + Toma de apuntes', 1350),
            dataCell('Toma de notas general y base de conocimiento', 1350),
            dataCell('S\u00EDntesis, res\u00FAmenes y chat sobre documentos', 1700),
            dataCell([bold('Estudio Activo e Interacci\u00F3n Pedag\u00F3gica (LMS + SRS)')], 1626, 'E8F8E8'),
          ]}),
          new TableRow({ children: [
            dataCell([bold('Algoritmo de Retención Activa')], 1650, 'EBF5FB'),
            dataCell('SM-2 tradicional o FSRS manual', 1350),
            dataCell('Algoritmo propietario basado en SM-2', 1350),
            dataCell('No posee algoritmo de retenci\u00F3n activa', 1350),
            dataCell('No posee algoritmo de retenci\u00F3n activa', 1700),
            dataCell([bold('FSRS integrado con propagaci\u00F3n en Grafo de Conocimiento')], 1626, 'E8F8E8'),
          ]}),
          new TableRow({ children: [
            dataCell([bold('Esfuerzo de Creaci\u00F3n de Contenido')], 1650, 'EBF5FB'),
            dataCell('Muy Alto (Manual tarjeta por tarjeta)', 1350),
            dataCell('Medio (Generaci\u00F3n autom\u00E1tica con IA)', 1350),
            dataCell('Alto (Manual, con plantillas rudimentarias)', 1350),
            dataCell('Bajo (Genera gu\u00EDas autom\u00E1ticas, pero no repasos interactivos)', 1700),
            dataCell([bold('Muy Bajo (Ingesta inteligente LlamaParse + auto-generaci\u00F3n flashcards)')], 1626, 'E8F8E8'),
          ]}),
          new TableRow({ children: [
            dataCell([bold('Portabilidad y Sober\u00E1n\u00EDa de Datos')], 1650, 'EBF5FB'),
            dataCell('Propietario (SQLite local .apkg)', 1350),
            dataCell('Cerrado (BD propietaria en su nube)', 1350),
            dataCell('Cerrado (Vendor Lock-in, exportaciones defectuosas)', 1350),
            dataCell('Cerrado (Datos cautivos en Google Drive)', 1700),
            dataCell([bold('Abierto (Markdown libre y exportable para uso personal)')], 1626, 'E8F8E8'),
          ]}),
          new TableRow({ children: [
            dataCell([bold('Privacidad y Cumplimiento (Ley N\u00B0 29733)')], 1650, 'EBF5FB'),
            dataCell('Local (seguro, sin colaboraci\u00F3n web nativa)', 1350),
            dataCell('Nube EE.UU.; pol\u00EDticas est\u00E1ndar', 1350),
            dataCell('Nube centralizada; datos pueden usarse para entrenamiento', 1350),
            dataCell('Nube Google; entrena modelos con datos subidos (versi\u00F3n est\u00E1ndar)', 1700),
            dataCell([bold('Local-First (Ollama) y Nube Empresarial con garant\u00EDa de no-entrenamiento')], 1626, 'E8F8E8'),
          ]}),
          new TableRow({ children: [
            dataCell([bold('M\u00F3dulo Anal\u00EDtico e Integraci\u00F3n LMS (Canvas/Moodle)')], 1650, 'EBF5FB'),
            dataCell('No posee', 1350),
            dataCell('No posee', 1350),
            dataCell('No posee', 1350),
            dataCell('No posee', 1700),
            dataCell([bold('S\u00ED (B2B institucional: indicadores de retenci\u00F3n + integraci\u00F3n LTI con Canvas/Moodle)')], 1626, 'E8F8E8'),
          ]}),
        ]
      }),

      spacer(),
      new Paragraph({ heading: HeadingLevel.HEADING_4, children: [new TextRun({ text: 'Ventajas Competitivas Clave de YachaqAI (Foco Estrat\u00E9gico S4)', font: 'Arial', size: 24, bold: true, color: '1B4F72' })] }),

      numbered([bold('Homeostato Docente-Estudiante (B2B2C):'), norm(' A diferencia de todas las herramientas anteriores, YachaqAI integra a las autoridades acad\u00E9micas a trav\u00E9s de informes agregados (anonimizados) sobre los conceptos donde los estudiantes muestran mayor dificultad (Panel 1 de S3), previniendo activamente la deserci\u00F3n universitaria exigida por SUNEDU [3].')]),
      numbered([bold('Propagaci\u00F3n en Grafo Sem\u00E1ntico:'), norm(' En YachaqAI, si un estudiante demuestra dominio sobre el concepto \u201CMitosis\u201D, el algoritmo FSRS propaga autom\u00E1ticamente una actualizaci\u00F3n de maestr\u00EDa a los conceptos hijos y relacionados (\u201CProfase\u201D, \u201CAnafase\u201D) en el grafo de conocimiento. Anki o RemNote tratan las tarjetas de forma aislada e inconexa.')]),
      numbered([bold('Local-First y Cumplimiento de Privacidad de Datos:'), norm(' La opci\u00F3n de ejecutar modelos de lenguaje locales (v\u00EDa Ollama) sin conexi\u00F3n a internet ampl\u00EDa la variedad de cumplimiento normativo institucional, atrayendo a universidades peruanas reticentes a compartir propiedad intelectual acad\u00E9mica o registros de menores con nubes extranjeras [22].')]),

      spacer(), sep(),

      // ===== PARTE 2 =====
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: 'Parte 2: Modelado y Proyecci\u00F3n Sistem\u00E1tica', font: 'Arial', size: 32, bold: true, color: '1F3864' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '4. Dise\u00F1o del sistema de inteligencia estrat\u00E9gica', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }),

      para([
        norm('El sistema de inteligencia estrat\u00E9gica es el encargado de consolidar la informaci\u00F3n de los radares y procesarla dentro de un entorno de decisi\u00F3n interactivo: la '),
        bold('Sala de Operaciones Virtual (Operations Room)'),
        norm(' [17].')
      ]),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: '4.1 La Sala de Operaciones (Operations Room) y sus 5 Pantallas', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_4, children: [new TextRun({ text: 'Justificaci\u00F3n y Dise\u00F1o Te\u00F3rico de la Sala de Operaciones', font: 'Arial', size: 24, bold: true, color: '1B4F72' })] }),

      para([
        norm('Desde la perspectiva de la cibern\u00E9tica organizacional y siguiendo las directrices de Jos\u00E9 P\u00E9rez R\u00EDos [2] y Stafford Beer [1], la '),
        bold('Sala de Operaciones Virtual'),
        norm(' no es un simple tablero de control visual; es un espacio cibern\u00E9tico estructurado para asistir al '),
        bold('Metasistema (Sistemas 3, 4 y 5)'),
        norm('. Su prop\u00F3sito fundamental es '),
        bold('atenuar y estructurar la variedad de datos brutos'),
        norm(', convirti\u00E9ndola en informaci\u00F3n inteligible sobre tres horizontes temporales (pasado, presente y futuro) para orientar el equilibrio adaptativo de la organizaci\u00F3n [2], [4].')
      ]),

      para([
        norm('Este dise\u00F1o aborda directamente la '),
        bold('Ley de Miller'),
        norm(' sobre los l\u00EDmites del procesamiento de la atenci\u00F3n humana (7 \u00B1 2 fragmentos cognitivos concurrentes) [10]. Al filtrar la complejidad del entorno a trav\u00E9s de sensores espec\u00EDficos y transductores automatizados, la Sala de Operaciones evita que el Sistema 3 (Gesti\u00F3n Operativa) colapse bajo la patolog\u00EDa de la '),
        bold('Hipertrofia del S3'),
        norm(' (microgesti\u00F3n desestructurada) [5]. Asimismo, act\u00FAa como el soporte f\u00EDsico e inform\u00E1tico del '),
        bold('Homeostato S3-S4'),
        norm(', regulando la tensi\u00F3n natural entre la estabilidad de la operaci\u00F3n (\u201Caqu\u00ED y ahora\u201D) y la necesidad de cambio para la adaptaci\u00F3n (\u201Cafuera y ma\u00F1ana\u201D) [2], [7].')
      ]),

      para([
        norm('De acuerdo con el marco del MSV, la Sala de Operaciones Virtual se organiza estrictamente en '),
        bold('5 pantallas interactivas'),
        norm(' especializadas:')
      ]),

      numbered([
        bold('Pantalla 1 \u2014 El Presente (Desempe\u00F1o Operativo y Sem\u00E1foros de S3): '),
        norm('Regula la viabilidad del d\u00EDa a d\u00EDa mediante el principio de "gesti\u00F3n por excepci\u00F3n". Utiliza un sistema visual de sem\u00E1foros tricolores (verde, amarillo, rojo) [2], [18]. Muestra variables del Sistema 2 como el Uptime de servicios (UptimeRobot) [17], tasa de excepciones (Sentry) [17], consumo en tiempo real de APIs [13], [14] y WAU / retenci\u00F3n D7 de PostHog/Google Analytics [11].')
      ]),

      numbered([
        bold('Pantalla 2 \u2014 El Pasado (Tendencias y Auditor\u00EDa de S3*): '),
        norm('Provee el contexto hist\u00F3rico del comportamiento del sistema para identificar patrones recurrentes, ciclos de estacionalidad acad\u00E9mica y deudas t\u00E9cnicas acumuladas [2], [10]. Despliega curvas de WAU, Costo de APIs, Churn y el historial de auditor\u00EDas del canal S3* [2], [16].')
      ]),

      numbered([
        bold('Pantalla 3 \u2014 El Futuro y Simulaci\u00F3n (Prospectiva de S4): '),
        norm('Es el motor del Sistema 4. Permite simular el impacto de decisiones alternativas frente a variaciones din\u00E1micas del entorno (\u201CWhat-if\u201D) mediante Din\u00E1mica de Sistemas (Vensim, Ithink o Google Sheets) [2], [8]. Aloja el Modelo M1 (costo y escala) [13], [14], Modelo M2 (p\u00E9rdida de pilotos B2B) [8], Modelo M3 (disponibilidad) [9] y el Modelo M5 (regulaciones SUNEDU a 5 a\u00F1os) [3], [24].')
      ]),

      numbered([
        bold('Pantalla 4 \u2014 El Modelo Cibert\u00E9nico (VSMod\u00AE): '),
        norm('Provee una representaci\u00F3n topol\u00F3gica e interactiva de la estructura de la organizaci\u00F3n en todos sus niveles de recursi\u00F3n (Ingenier\u00EDa, Growth, Ventas y Soporte), visualizando el estado de los canales de comunicaci\u00F3n, transducci\u00F3n y patolog\u00EDas en los homeostatos [2], [5].')
      ]),

      numbered([
        bold('Pantalla 5 \u2014 Informaci\u00F3n Complementaria (Vigilancia del Entorno): '),
        norm('Filtra la variedad del entorno externo mediante feeds de arXiv (NLP/RAG) [13], alertas de SUNEDU/APDP (Ley N\u00B0 29733) [22], [23], matrices cualitativas de competidores (Anki, RemNote, Notion AI) [25] e hilos de retroalimentaci\u00F3n de Discord.')
      ]),

      spacer(),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: '4.2 El Bucle de Escalamiento Alged\u00F3nico del S4', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      para([
        norm('Si un sensor de S4 detecta una disrupci\u00F3n cr\u00EDtica en el entorno que amenaza la viabilidad general de la empresa, el S4 '),
        bold('puentea al S3'),
        norm(' y gatilla una '),
        bold('Alerta Alged\u00F3nica Estrat\u00E9gica'),
        norm(' directa a la Junta de Fundadores (S5) utilizando el canal alged\u00F3nico de comunicaci\u00F3n de emergencia, convocando a una sesi\u00F3n de redise\u00F1o de identidad organizacional de manera inmediata [1], [18].')
      ]),

      spacer(), sep(),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '5. Dise\u00F1o del sistema de prospectiva y escenarios', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }),

      para([norm('Para tomar decisiones basadas en datos y no en intuiciones subjetivas, el S4 de Synapta utiliza '), bold('Modelos de Simulaci\u00F3n Din\u00E1mica'), norm(' recomendados por Jos\u00E9 P\u00E9rez R\u00EDos [2], [5]. Estos modelos permiten evaluar el impacto de variables externas a trav\u00E9s de escenarios \u201Cqu\u00E9 pasar\u00EDa si\u201D (What-if) [2], [5].')]),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: '5.1 Modelo M2 (Impacto de P\u00E9rdida del Piloto B2B)', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      para([norm('Este modelo eval\u00FAa la vulnerabilidad de la tracci\u00F3n inicial de YachaqAI frente al abandono o cancelaci\u00F3n por parte de docentes clave en universidades peruanas [3].')]),

      bullet([bold('L\u00F3gica del Modelo:'), norm(' Simula el impacto en cascada sobre los estudiantes cuando un docente cancela la participaci\u00F3n en el piloto.')]),
      bullet([bold('Variables de Entrada:')]),
      bullet([italic('Tasa de recomendaci\u00F3n docente en aula:'), norm(' 30%. Justificaci\u00F3n: Benchmarks de adopci\u00F3n en pilotos acad\u00E9micos demuestran que el aval del docente impulsa entre un 25% y un 35% del registro inicial en modelos B2B2C universitarios.')], 1),
      bullet([italic('Tasa de retenci\u00F3n de estudiantes tras la salida del docente:'), norm(' 50%. Justificaci\u00F3n: Al retirar la obligatoriedad acad\u00E9mica, la tasa de uso decae en un 50% para usuarios comunes.')], 1),
      bullet([italic('Semanas de retraso para captar un docente de reemplazo:'), norm(' 8 semanas. Justificaci\u00F3n: Ciclo promedio de onboarding en pilotos institucionales en Per\u00FA.')], 1),
      bullet([bold('Variables de Salida:')]),
      bullet([norm('Ca\u00EDda proyectada de Usuarios Activos Semanales (WAU) el mes siguiente a la cancelaci\u00F3n.')], 1),
      bullet([norm('Costo de Adquisici\u00F3n de Clientes (CAC) adicional necesario para compensar la ca\u00EDda con pauta B2C [8].')], 1),
      bullet([bold('Decisiones Pre-dise\u00F1adas:')]),
      bullet([italic('Gatillo Alged\u00F3nico:'), norm(' Si el M2 proyecta una ca\u00EDda de WAU > 20% en el mes siguiente, activar inmediatamente el '), bold('Protocolo C (Cancelaci\u00F3n de Piloto)'), norm(' en S1.3 [11].')], 1),

      spacer(),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: '5.2 Modelo M5 (Penetración de Mercado y Regulaciones SUNEDU)', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      para([norm('Simula a 5 a\u00F1os la sostenibilidad financiera de Synapta ante variaciones en el mercado de educaci\u00F3n virtual en el Per\u00FA y restricciones del ente regulador [3].')]),

      bullet([bold('L\u00F3gica del Modelo:'), norm(' Modelo cuantitativo de Din\u00E1mica de Sistemas que eval\u00FAa el punto de equilibrio financiero frente a la adopci\u00F3n de competidores y el endurecimiento de normativas de calidad universitaria de SUNEDU.')]),
      bullet([bold('Variables de Entrada:')]),
      bullet([italic('Matr\u00EDcula total universitaria nacional:'), norm(' 1.2M de estudiantes en pregrado y posgrado en universidades peruanas licenciadas (SUNEDU SIU [4]).')], 1),
      bullet([italic('Tasa anual de crecimiento de educaci\u00F3n virtual/semipresencial:'), norm(' 8.5% anual. Justificaci\u00F3n: incremento del 25% general y 38% en privadas tras la hibridaci\u00F3n posandemia [24].')], 1),
      bullet([italic('Tasa anual de penetraci\u00F3n proyectada de competidores EdTech:'), norm(' 5.0%. Justificaci\u00F3n: Cifras de penetraci\u00F3n inicial de software acad\u00E9mico en LATAM (HolonIQ [25]), entre 3% y 7% anual en los primeros 3 a\u00F1os.')], 1),
      bullet([italic('Probabilidad de endurecimiento regulatorio de SUNEDU:'), norm(' 40%. Justificaci\u00F3n: Calibrado seg\u00FAn el hist\u00F3rico de SUNEDU que registra 2\u20133 modificaciones normativas mayores en cada periodo de 5 a\u00F1os [3].')], 1),
      bullet([bold('Decisiones Pre-dise\u00F1adas:')]),
      bullet([italic('Gatillo Alged\u00F3nico:'), norm(' Si la probabilidad de cambio regulatorio en el M5 supera el 60%, el S4 instruye al backlog de Ingenier\u00EDa iniciar el desarrollo de un m\u00F3dulo de compatibilidad fuera de l\u00EDnea y exportador de evidencias en PDF [3], [23].')], 1),

      spacer(), sep(),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '5.3 Preparaci\u00F3n ante Disrupciones Tecnol\u00F3gicas y de Mercado', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }),

      para([norm('Para asegurar la adaptabilidad, se pre-dise\u00F1an dos planes estrat\u00E9gicos ante disrupciones simuladas en el S4:')]),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: 'Disrupci\u00F3n A: Google NotebookLM lanza una versi\u00F3n corporativa gratuita para universidades SUNEDU', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      bullet([bold('An\u00E1lisis del Entorno (S4):'), norm(' Google cuenta con ventajas de capital y modelos de gran escala. Sin embargo, NotebookLM es un sistema cerrado (\u201CVendor Lock-in\u201D) que no permite exportar notas en formato abierto y restringe la privacidad de datos.')]),
      bullet([bold('Plan de Adaptaci\u00F3n:')]),
      numbered([bold('Diferenciaci\u00F3n del Ethos (S5):'), norm(' Reforzar en la marca el valor de la '), bold('portabilidad absoluta (Markdown libre y exportable)'), norm(' y la privacidad de datos personales bajo la Ley N\u00B0 29733 [22].')]),
      numbered([bold('Calibraci\u00F3n T\u00E9cica (S1.1):'), norm(' Integrar de forma prioritaria el algoritmo '), bold('FSRS local (offline)'), norm(' [12]. NotebookLM no cuenta con motores de repetici\u00F3n espaciada cient\u00EDfica; YachaqAI se posiciona como el motor din\u00E1mico de '), italic('retenci\u00F3n'), norm(', no solo de consulta pasiva.')]),

      spacer(),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: 'Disrupci\u00F3n B: SUNEDU proh\u00EDbe el uso de IAs generativas en tareas acad\u00E9micas', font: 'Arial', size: 26, bold: true, color: '1A5276' })] }),

      bullet([bold('An\u00E1lisis del Entorno (S4):'), norm(' Un cambio regulatorio de esta escala desatar\u00EDa el p\u00E1nico en las universidades aliadas (B2B), que cancelar\u00EDan contratos de software para evitar sanciones.')]),
      bullet([bold('Plan de Adaptaci\u00F3n:')]),
      numbered([bold('Pivote de Producto (S1.1/S1.3):'), norm(' Desactivar de forma inmediata las funciones de generaci\u00F3n de res\u00FAmenes por IA (RAG de escritura) en las licencias institucionales B2B.')]),
      numbered([bold('Redise\u00F1o de Propuesta de Valor (S5):'), norm(' Re-enfocar a YachaqAI exclusivamente como una '), bold('plataforma de repaso activo y evaluaci\u00F3n adaptativa'), norm('. La IA no escribe los trabajos del estudiante; en su lugar, '), italic('interroga'), norm(' y '), italic('eval\u00FAa'), norm(' la retenci\u00F3n del alumno sobre los materiales de clase. Se presenta ante SUNEDU como herramienta de combate contra el plagio por IA.')]),

      spacer(), sep(),

      // ===== PARTE 3 =====
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: 'Parte 3: Principios Cibert\u00E9ticos y Leyes del Metasistema', font: 'Arial', size: 32, bold: true, color: '1F3864' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '6. Aplicaci\u00F3n de la Ley de Ashby (Variedad Requerida)', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }),

      para([
        norm('La '),
        bold('Ley de Ashby'),
        norm(' establece que '),
        italic('\u201Csolo la variedad puede absorber variedad\u201D'),
        norm(' [4]. El S4 de Synapta aplica esta ley equilibrando la inmensa complejidad del entorno EdTech mediante atenuadores y amplificadores espec\u00EDficos de variedad:')
      ]),

      bullet([bold('Atenuadores de Variedad Externa (Filtros de Complejidad):')]),
      bullet([italic('Filtro arXiv:'), norm(' El CTO aten\u00FAa la variedad cient\u00EDfica diaria filtrando las publicaciones de NLP a trav\u00E9s de palabras clave estrictas (RAG, FSRS, local-LLM), reduciendo m\u00E1s de 100 papers diarios a solo 2 o 3 con potencial real de aplicaci\u00F3n.')], 1),
      bullet([italic('Filtro Legal:'), norm(' El asesor legal externo aten\u00FAa la variedad legislativa de El Peruano, extrayendo \u00FAnicamente las directivas que impactan directamente en el uso de datos (Ley N\u00B0 29733) o licenciamiento semipresencial de SUNEDU.')], 1),
      bullet([bold('Amplificadores de Variedad Interna (Multiplicadores de Respuesta):')]),
      bullet([italic('Modelos M2/M5:'), norm(' Las simulaciones din\u00E1micas ampl\u00EDan la capacidad de comprensi\u00F3n estrat\u00E9gica del CEO y CTO, permiti\u00E9ndoles visualizar el impacto a 5 a\u00F1os de decisiones actuales en minutos.')], 1),
      bullet([italic('Planes Dormidos (Planes de Adaptaci\u00F3n):'), norm(' Los protocolos pre-dise\u00F1ados ante la prohibici\u00F3n de IA o NotebookLM ampl\u00EDan la velocidad de respuesta de Synapta, eliminando la necesidad de improvisaci\u00F3n t\u00E1ctica ante crisis de viabilidad.')], 1),

      spacer(), sep(),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '7. Teorema de la Recursividad en el S4', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }),

      para([norm('El '), bold('Teorema de la Recursividad'), norm(' prescribe que todo sistema viable contiene y est\u00E1 contenido por sistemas viables [30]. El dise\u00F1o del S4 de Synapta respeta esta jerarqu\u00EDa vertical:')]),

      bullet([bold('Nivel de Recursi\u00F3n 0 (Synapta Corporativo):'), norm(' El S4 corporativo monitorea tendencias macro de LLMs de Google/OpenAI y competidores globales. Gestiona el simulador consolidado M5.')]),
      bullet([bold('Nivel de Recursi\u00F3n 1 (Divisiones Geogr\u00E1ficas en Fase 3):')]),
      bullet([italic('S4 Divisi\u00F3n Per\u00FA:'), norm(' Monitorea de forma espec\u00EDfica las directivas del Diario Oficial El Peruano y resoluciones de SUNEDU. Adapta el simulador M5 a la matr\u00EDcula local y la competencia nacional.')], 1),
      bullet([italic('S4 Divisi\u00F3n Internacional (ej. Colombia):'), norm(' Monitorea las normativas del Ministerio de Educaci\u00F3n Nacional de Colombia (MEN) y competidores locales.')], 1),
      bullet([bold('Homeostato S4(0) \u2014 S4(1):'), norm(' Las alertas de disrupci\u00F3n regulatoria nacional capturadas por el S4 local (Nivel 1) son transducidas a reportes de riesgo consolidado mensual y transmitidas al S4 corporativo (Nivel 0) para actualizar las proyecciones globales y reasignar presupuestos.')]),

      spacer(), sep(),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '8. Prevención Activa de Patologías Estructurales y Funcionales', font: 'Arial', size: 28, bold: true, color: '2E75B6' })] }),

      para([norm('El dise\u00F1o del S4 de Synapta est\u00E1 estructurado para prevenir patolog\u00EDas descritas por Jos\u00E9 P\u00E9rez R\u00EDos [5]:')]),

      numbered([bold('Prevenci\u00F3n del \u201CPollo sin Cabeza\u201D (Headless Chicken):'), norm(' Patolog\u00EDa causada por la inexplicación de un Sistema 4 funcional [5]. Synapta previene esto asignando formalmente la responsabilidad de los radares (CTO, Growth y Sales/Legal) en la matriz de roles, obligando a cruzar datos estrat\u00E9gicos en la SAS mensual.')]),
      numbered([bold('Prevenci\u00F3n del Colapso S3-S4 (Disociación de Gesti\u00F3n):'), norm(' Ocurre cuando S3 y S4 no se comunican, dividiendo la empresa en dos mundos aislados [19]. Se previene implementando la '), bold('Sala de Operaciones Virtual'), norm(' y el protocolo adaptado de '), bold('Team Syntegrity'), norm(' garantizando un homeostato democr\u00E1tico y as\u00EDncrono para dirimir tensiones presupuestarias.')]),
      numbered([bold('Prevenci\u00F3n del Bloqueo Alged\u00F3nico:'), norm(' Ocurre cuando las alertas del entorno estrat\u00E9gico son filtradas o silenciadas por miedo o negligencia burocrática antes de llegar al S5 [35]. Se previene mediante la automatizaci\u00F3n de semáforos cr\u00EDticos en la Pantalla 3 de la Sala de Operaciones, que gatilla una alerta alged\u00F3nica al S5 sin requerir intermediación.')]),

      spacer(), sep(),

      // ===== FUENTES =====
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: 'Fuentes Citadas', font: 'Arial', size: 32, bold: true, color: '1F3864' })] }),

      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [600, 3200, 5226],
        rows: [
          new TableRow({ children: [
            headerCell('#', 600), headerCell('Fuente', 3200), headerCell('Detalle y Uso de M\u00E9trica', 5226)
          ]}),
          ...[
            ['[1]', 'Beer, Stafford (1985). Diagnosing the System for Organizations. John Wiley & Sons.', 'Definici\u00F3n te\u00F3rica del Sistema 4 como el \u00F3rgano de adaptaci\u00F3n encargado del \u201Cexterior y el futuro\u201D.'],
            ['[2]', 'P\u00E9rez R\u00EDos, Jos\u00E9 (2012). Dise\u00F1o y Diagn\u00F3stico para Organizaciones Sostenibles. Editorial Ibergarceta.', 'Teor\u00EDa del metasistema del VSM, modelado del entorno, principios de viabilidad y estructuraci\u00F3n de la Sala de Operaciones.'],
            ['[3]', 'SUNEDU (2026). Listado de universidades con licencia institucional vigente.', 'Justificaci\u00F3n de las 105 universidades peruanas licenciadas y sus marcos normativos.'],
            ['[4]', 'Ashby, W. Ross (1956). An Introduction to Cybernetics. Chapman & Hall.', 'Ley de la variedad requerida para regular los disturbios y fluctuaciones del mercado.'],
            ['[5]', 'P\u00E9rez R\u00EDos, Jos\u00E9 (2008). Dise\u00F1o de organizaciones viables: Un enfoque sist\u00E9mico.', 'Patolog\u00EDas de falta de Sistema 4, esquizofrenia de gesti\u00F3n e hipertrofia del S3.'],
            ['[6]', 'IMARC Group (2025). Latin America EdTech Market Size, Industry Growth & Forecast 2026\u20132034.', 'Datos macroecon\u00F3micos del CAGR 11.8%\u201312.5% para proyecciones del modelo M5.'],
            ['[7]', 'Beer, Stafford (1979). The Heart of Enterprise. John Wiley & Sons.', 'Dise\u00F1o y balance de los homeostatos organizacionales.'],
            ['[8]', 'StartupPeru / PROINNOVATE (2023). Gu\u00EDa de Presupuestos y Pilotos de Validaci\u00F3n en Startups Pre-Seed.', 'Calibraci\u00F3n de CAC, vi\u00E1ticos y presupuestos para las simulaciones de costos.'],
            ['[9]', 'NCIIA (2019). Student Venture Team Size and Commitment Standards.', 'Distribuci\u00F3n multiactiva en equipos peque\u00F1os (2-5 personas, dedicaci\u00F3n parcial).'],
            ['[10]', 'Miller, George A. (1956). The Magical Number Seven, Plus or Minus Two.', 'Capacidad cognitiva de atenci\u00F3n del S3.'],
            ['[11]', 'Y Combinator (2020). Startup Playbook & MVP Validation Cycles.', 'Ciclos de tracci\u00F3n, horizontes de pilotos y m\u00E9tricas de retenci\u00F3n D7.'],
            ['[12]', 'FSRS Benchmark Study (2024). An Empirical Comparison of Spaced Repetition Schedulers.', 'Mapeo t\u00E9cnico del algoritmo FSRS frente a competidores.'],
            ['[13]', 'Google Cloud (2026). Vertex AI / Gemini API Pricing Page.', 'Costos de Gemini 2.5 Flash para simulaciones variables del modelo M1/M5.'],
            ['[14]', 'Supabase (2026). Pricing Plans & Platform Limits.', 'L\u00EDmites de PostgreSQL para escalamiento t\u00E9cnico del S4.'],
            ['[15]', 'Vercel (2026). Pricing and Plan Limits.', 'Hosting Next.js en entornos de simulaci\u00F3n de carga.'],
            ['[16]', 'Juran, J. M. (1989). Juran on Leadership for Quality. Free Press.', 'Estructuras de calidad y mejora continua.'],
            ['[17]', 'Beyer, B., Jones, C., Petoff, J., & Murphy, K. (2016). Site Reliability Engineering: How Google Runs Production Systems.', 'Modelos de dashboards e incidencias para la Sala de Operaciones.'],
            ['[18]', 'GitLab (2022). Remote Team Communication Playbook & Response SLAs.', 'Est\u00E1ndares de respuesta as\u00EDncrona para notificaciones cr\u00EDticas.'],
            ['[19]', 'Zendesk (2024). Customer Experience Trends Report.', 'Tiempos de soporte para la calibración del modelo de Churn.'],
            ['[20]', 'Scielo / Revistas acad\u00E9micas (2023). Deserci\u00F3n estudiantil en universidades latinoamericanas.', 'Meta de retención institucional del ~27% de deserci\u00F3n universitaria en primer a\u00F1o en LATAM.'],
            ['[21]', 'Ebbinghaus, Hermann (1885). Memory: A Contribution to Experimental Psychology.', 'Curva de olvido (~70% de p\u00E9rdida en 24h) para el modelo de utilidad pedag\u00F3gica.'],
            ['[22]', 'Congreso de la Rep\u00FAblica (2011). Ley N\u00B0 29733 de Protecci\u00F3n de Datos Personales. Diario Oficial El Peruano.', 'Marco regulatorio de la protecci\u00F3n y privacidad de datos personales en el Per\u00FA.'],
            ['[23]', 'SUNEDU (2015). Ley Universitaria N\u00B0 30220. Diario Oficial El Peruano.', 'Marco legal regulatorio de las universidades del Per\u00FA y sus condiciones b\u00E1sicas de calidad.'],
            ['[24]', 'Grupo Educaci\u00F3n al Futuro / SUNEDU (2024). Evoluci\u00F3n de la Matr\u00EDcula Universitaria en el Per\u00FA 2020-2023.', 'Datos de crecimiento de matr\u00EDcula universitaria en Per\u00FA (25% general y 38% en privadas).'],
            ['[25]', 'HolonIQ (2023). Latin America EdTech Market Census & Penetration Rates.', 'Tasa de penetraci\u00F3n inicial de software de estudio y herramientas acad\u00E9micas digitales en LATAM (3% a 7%).'],
          ].map(([num, src, det]) => new TableRow({
            children: [
              dataCell([bold(num)], 600, 'F2F3F4'),
              dataCell(src, 3200),
              dataCell(det, 5226, 'F2F3F4'),
            ]
          }))
        ]
      }),

      spacer(),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(path.join(__dirname, '..', 'diseno_organizacional_synapta', '9_sistema_4.docx'), buf);
  console.log('Document created successfully');
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

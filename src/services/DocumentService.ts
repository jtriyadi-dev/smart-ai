import {
  DocumentModel,
  DocumentCategory,
  DocumentStatus,
  DocumentClassification,
  DocumentVisibility,
  DocumentVersion,
  DocumentApproval,
  DocumentShare,
  DocumentAuditLog,
  DocumentRequest,
  ContractDocument,
  CustomerRole,
} from '../types';

const STORAGE_DOCUMENTS = 'smart_ai_document_center_list';
const STORAGE_DOC_REQUESTS = 'smart_ai_document_requests';
const STORAGE_FAVORITES = 'smart_ai_document_favorites';
const STORAGE_PINNED = 'smart_ai_document_pinned';

export interface DocumentFilterOptions {
  category?: DocumentCategory | 'ALL';
  projectId?: string;
  status?: DocumentStatus | 'ALL';
  classification?: DocumentClassification | 'ALL';
  searchQuery?: string;
  sortBy?: 'NEWEST' | 'OLDEST' | 'NAME_ASC' | 'NAME_DESC' | 'RECENTLY_UPDATED';
  showFavoritesOnly?: boolean;
  showPinnedOnly?: boolean;
}

export class DocumentService {
  /**
   * Initialize Document Store with initial seed documents if empty
   */
  public static initialize(): void {
    if (!localStorage.getItem(STORAGE_DOCUMENTS)) {
      const now = new Date().toISOString();
      const defaultDocs: DocumentModel[] = [
        {
          id: 'doc_prop_001',
          documentNumber: 'SAI-PROP-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          proposalId: 'SAI-PROP-2026-0001',
          proposalNumber: 'SAI-PROP-2026-0001',
          name: 'Penawaran Solusi Smart Mining Fleet & IoT Analytics',
          description: 'Dokumen Proposal Teknis & Komersial Resmi Sistem Manajemen Armada Tambang berbasis AI & IoT Telemetry.',
          category: 'PROPOSAL',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '3.8 MB',
          version: '1.0',
          status: 'APPROVED',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'PUBLIC_TO_CUSTOMER',
          storageReference: 'storage/proposals/SAI-PROP-2026-0001.pdf',
          uploadedBy: 'Dimas Suroso (Sales Lead)',
          createdAt: '2026-08-01T10:00:00Z',
          updatedAt: '2026-08-02T14:20:00Z',
          downloadCount: 14,
          tags: ['Proposal', 'Smart Mining', 'IoT', 'AI Fleet'],
          isFavorite: true,
          isPinned: true,
          watermarked: true,
          relatedDocIds: ['doc_quo_001', 'doc_con_001'],
          versions: [
            {
              id: 'ver_prop_10',
              documentId: 'doc_prop_001',
              version: '1.0',
              fileReference: 'storage/proposals/SAI-PROP-2026-0001-v10.pdf',
              fileSize: '3.8 MB',
              changeDescription: 'Draf Proposal Final disetujui Direksi',
              uploadedBy: 'Dimas Suroso',
              createdAt: '2026-08-01T10:00:00Z',
            },
          ],
          approvals: [
            {
              id: 'app_prop_1',
              documentId: 'doc_prop_001',
              reviewerId: 'rev_admin_01',
              reviewerName: 'Bambang Triatmojo',
              reviewerRole: 'VP Business Development',
              status: 'APPROVED',
              comment: 'Proposal teknis dan arsitektur IoT disetujui untuk dikirim ke PT Nusantara Mining.',
              reviewedAt: '2026-08-01T16:00:00Z',
            },
          ],
          auditLogs: [
            {
              id: 'log_prop_1',
              documentId: 'doc_prop_001',
              action: 'CREATED',
              performedBy: 'Dimas Suroso',
              details: 'Membuat dokumen Proposal SAI-PROP-2026-0001',
              timestamp: '2026-08-01T10:00:00Z',
            },
            {
              id: 'log_prop_2',
              documentId: 'doc_prop_001',
              action: 'APPROVED',
              performedBy: 'Bambang Triatmojo',
              details: 'Menyetujui dokumen proposal untuk diterbitkan ke pelanggan',
              timestamp: '2026-08-01T16:00:00Z',
            },
          ],
        },
        {
          id: 'doc_quo_001',
          documentNumber: 'SAI-QUO-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          quotationId: 'SAI-QTN-2026-0001',
          quotationNumber: 'SAI-QTN-2026-0001',
          name: 'Official Commercial Quotation - IDR 500.000.000',
          description: 'Surat Penawaran Harga (Quotation) Komersial Resmi Pengembangan Software & Sensor Gateway.',
          category: 'QUOTATION',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '2.4 MB',
          version: '1.1',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'CUSTOMER_PRIVATE',
          storageReference: 'storage/quotations/SAI-QUO-2026-0001.pdf',
          uploadedBy: 'Finance Dept (SMART-AI.ID)',
          createdAt: '2026-08-03T09:00:00Z',
          updatedAt: '2026-08-04T11:00:00Z',
          downloadCount: 22,
          tags: ['Quotation', 'Komersial', 'IDR 500M'],
          isFavorite: true,
          isPinned: true,
          watermarked: true,
          relatedDocIds: ['doc_prop_001', 'doc_con_001', 'doc_inv_001'],
          versions: [
            {
              id: 'ver_quo_10',
              documentId: 'doc_quo_001',
              version: '1.0',
              fileReference: 'storage/quotations/SAI-QUO-2026-0001-v10.pdf',
              fileSize: '2.3 MB',
              changeDescription: 'Penawaran Awal Rp 550.000.000',
              uploadedBy: 'Finance Dept',
              createdAt: '2026-08-03T09:00:00Z',
            },
            {
              id: 'ver_quo_11',
              documentId: 'doc_quo_001',
              version: '1.1',
              fileReference: 'storage/quotations/SAI-QUO-2026-0001-v11.pdf',
              fileSize: '2.4 MB',
              changeDescription: 'Pemberian Diskon Kemitraan Strategis Tambang menjadi Rp 500.000.000',
              uploadedBy: 'Finance Dept',
              createdAt: '2026-08-04T11:00:00Z',
            },
          ],
          approvals: [
            {
              id: 'app_quo_1',
              documentId: 'doc_quo_001',
              reviewerId: 'rev_fin_01',
              reviewerName: 'Siti Rahmayanti',
              reviewerRole: 'Customer Finance Lead',
              status: 'APPROVED',
              comment: 'Penawaran komersial v1.1 telah disetujui oleh Direksi PT Nusantara Mining Energy.',
              reviewedAt: '2026-08-04T15:00:00Z',
            },
          ],
          auditLogs: [
            {
              id: 'log_quo_1',
              documentId: 'doc_quo_001',
              action: 'CREATED',
              performedBy: 'Finance Dept',
              details: 'Menerbitkan Quotation SAI-QUO-2026-0001',
              timestamp: '2026-08-03T09:00:00Z',
            },
            {
              id: 'log_quo_2',
              documentId: 'doc_quo_001',
              action: 'VERSION_CREATED',
              performedBy: 'Finance Dept',
              details: 'Memperbarui versi menjadi 1.1 dengan penyesuaian nilai investasi',
              timestamp: '2026-08-04T11:00:00Z',
            },
          ],
        },
        {
          id: 'doc_con_001',
          documentNumber: 'SAI-CON-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          contractId: 'SAI-CON-2026-0001',
          contractNumber: 'SAI-CON-2026-0001',
          name: 'Perjanjian Kerja Sama Pengembangan Software & Service Level Agreement (SLA)',
          description: 'Dokumen Perjanjian Kontrak Induk Pengadaan Perangkat Lunak, Lisensi AI Engine & SLA Dukungan Teknis 24/7.',
          category: 'CONTRACT',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '4.5 MB',
          version: '2.0',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'CONFIDENTIAL',
          storageReference: 'storage/contracts/SAI-CON-2026-0001.pdf',
          uploadedBy: 'Legal & Compliance SMART-AI.ID',
          createdAt: '2026-08-05T08:00:00Z',
          updatedAt: '2026-08-06T10:00:00Z',
          expiresAt: '2027-08-05T23:59:59Z',
          downloadCount: 30,
          tags: ['Kontrak Induk', 'SLA', 'Tanda Tangan Digital', 'Legal'],
          isFavorite: true,
          isPinned: true,
          watermarked: true,
          relatedDocIds: ['doc_prop_001', 'doc_quo_001', 'doc_inv_001', 'doc_tech_001'],
          contractDetails: {
            id: 'con_det_001',
            contractNumber: 'SAI-CON-2026-0001',
            contractName: 'Master Software Development & Maintenance Agreement',
            companyId: 'COMP-001',
            projectId: 'PROJ-001',
            effectiveDate: '2026-08-05',
            expirationDate: '2027-08-05',
            status: 'ACTIVE',
            version: '2.0',
            signatureStatus: 'SIGNED',
            signerName: 'Hendra Wijaya',
            signerRole: 'VP Technology (Client Representative)',
            signedAt: '2026-08-06T10:00:00Z',
          },
          versions: [
            {
              id: 'ver_con_10',
              documentId: 'doc_con_001',
              version: '1.0',
              fileReference: 'storage/contracts/SAI-CON-2026-0001-v10.pdf',
              fileSize: '4.2 MB',
              changeDescription: 'Draf awal perjanjian legal',
              uploadedBy: 'Legal SMART-AI.ID',
              createdAt: '2026-08-05T08:00:00Z',
            },
            {
              id: 'ver_con_20',
              documentId: 'doc_con_001',
              version: '2.0',
              fileReference: 'storage/contracts/SAI-CON-2026-0001-v20.pdf',
              fileSize: '4.5 MB',
              changeDescription: 'Penambahan pasal garansi bug fixing 12 bulan & SLA purna jual',
              uploadedBy: 'Legal SMART-AI.ID',
              createdAt: '2026-08-06T10:00:00Z',
            },
          ],
          approvals: [
            {
              id: 'app_con_1',
              documentId: 'doc_con_001',
              reviewerId: 'cuser_001',
              reviewerName: 'Hendra Wijaya',
              reviewerRole: 'VP Technology PT Nusantara Mining',
              status: 'APPROVED',
              comment: 'Kontrak disetujui & telah ditandatangani secara elektronik oleh pihak pelanggan.',
              reviewedAt: '2026-08-06T10:00:00Z',
            },
          ],
          auditLogs: [
            {
              id: 'log_con_1',
              documentId: 'doc_con_001',
              action: 'CREATED',
              performedBy: 'Legal SMART-AI.ID',
              details: 'Membuat Draf Kontrak Induk SAI-CON-2026-0001',
              timestamp: '2026-08-05T08:00:00Z',
            },
            {
              id: 'log_con_2',
              documentId: 'doc_con_001',
              action: 'APPROVED',
              performedBy: 'Hendra Wijaya',
              details: 'Penandatanganan kontrak dan pengesahan status ACTIVE',
              timestamp: '2026-08-06T10:00:00Z',
            },
          ],
        },
        {
          id: 'doc_inv_001',
          documentNumber: 'SAI-INV-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          invoiceId: 'SAI-INV-2026-0001',
          invoiceNumber: 'SAI-INV-2026-0001',
          name: 'Invoice Tagihan DP 30% - IDR 150.000.000',
          description: 'Invoice Pembayaran Termin 1 (Down Payment) Proyek Smart Mining Fleet Platform.',
          category: 'INVOICE',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '1.2 MB',
          version: '1.0',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'CUSTOMER_PRIVATE',
          storageReference: 'storage/invoices/SAI-INV-2026-0001.pdf',
          uploadedBy: 'Billing Engine SMART-AI.ID',
          createdAt: '2026-08-06T11:00:00Z',
          updatedAt: '2026-08-07T14:00:00Z',
          downloadCount: 18,
          tags: ['Invoice', 'Termin 1', 'PAID'],
          isFavorite: false,
          isPinned: false,
          watermarked: true,
          relatedDocIds: ['doc_con_001', 'doc_rcp_001'],
          versions: [
            {
              id: 'ver_inv_10',
              documentId: 'doc_inv_001',
              version: '1.0',
              fileReference: 'storage/invoices/SAI-INV-2026-0001-v10.pdf',
              fileSize: '1.2 MB',
              changeDescription: 'Invoice resmi diterbitkan oleh Billing Engine',
              uploadedBy: 'Billing Engine',
              createdAt: '2026-08-06T11:00:00Z',
            },
          ],
          approvals: [],
          auditLogs: [
            {
              id: 'log_inv_1',
              documentId: 'doc_inv_001',
              action: 'CREATED',
              performedBy: 'Billing Engine',
              details: 'Menerbitkan Invoice SAI-INV-2026-0001 senilai Rp 150.000.000',
              timestamp: '2026-08-06T11:00:00Z',
            },
            {
              id: 'log_inv_2',
              documentId: 'doc_inv_001',
              action: 'DOWNLOADED',
              performedBy: 'Siti Rahmayanti (Finance)',
              details: 'Mengunduh file PDF invoice untuk proses transfer bank',
              timestamp: '2026-08-07T09:15:00Z',
            },
          ],
        },
        {
          id: 'doc_inv_002',
          documentNumber: 'SAI-INV-2026-0002',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          invoiceId: 'SAI-INV-2026-0002',
          invoiceNumber: 'SAI-INV-2026-0002',
          name: 'Invoice Tagihan Milestone 1 (30%) - IDR 150.000.000',
          description: 'Invoice Pembayaran Termin 2 (IoT Telemetry Engine Release).',
          category: 'INVOICE',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '1.2 MB',
          version: '1.0',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'CUSTOMER_PRIVATE',
          storageReference: 'storage/invoices/SAI-INV-2026-0002.pdf',
          uploadedBy: 'Billing Engine SMART-AI.ID',
          createdAt: '2026-08-12T10:00:00Z',
          updatedAt: '2026-08-13T16:00:00Z',
          downloadCount: 12,
          tags: ['Invoice', 'Milestone 1', 'PAID'],
          isFavorite: false,
          isPinned: false,
          watermarked: true,
          relatedDocIds: ['doc_rcp_002'],
          versions: [
            {
              id: 'ver_inv2_10',
              documentId: 'doc_inv_002',
              version: '1.0',
              fileReference: 'storage/invoices/SAI-INV-2026-0002-v10.pdf',
              fileSize: '1.2 MB',
              changeDescription: 'Terbit Invoice Milestone 1',
              uploadedBy: 'Billing Engine',
              createdAt: '2026-08-12T10:00:00Z',
            },
          ],
          approvals: [],
          auditLogs: [
            {
              id: 'log_inv2_1',
              documentId: 'doc_inv_002',
              action: 'CREATED',
              performedBy: 'Billing Engine',
              details: 'Menerbitkan Invoice SAI-INV-2026-0002',
              timestamp: '2026-08-12T10:00:00Z',
            },
          ],
        },
        {
          id: 'doc_rcp_001',
          documentNumber: 'SAI-RCP-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          invoiceId: 'SAI-INV-2026-0001',
          receiptNumber: 'SAI-RCP-2026-0001',
          name: 'Bukti Pembayaran Kuitansi Resmi - IDR 150.000.000',
          description: 'Kuitansi Pelunasan Tagihan DP 30% (Bank Mandiri Transfer #TRX-20260807-001).',
          category: 'PAYMENT_RECEIPT',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '850 KB',
          version: '1.0',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'CUSTOMER_PRIVATE',
          storageReference: 'storage/receipts/SAI-RCP-2026-0001.pdf',
          uploadedBy: 'Finance Dept',
          createdAt: '2026-08-07T14:30:00Z',
          updatedAt: '2026-08-07T14:30:00Z',
          downloadCount: 9,
          tags: ['Kuitansi', 'Receipt', 'DP Paid'],
          isFavorite: false,
          isPinned: false,
          watermarked: true,
          relatedDocIds: ['doc_inv_001'],
          versions: [
            {
              id: 'ver_rcp_10',
              documentId: 'doc_rcp_001',
              version: '1.0',
              fileReference: 'storage/receipts/SAI-RCP-2026-0001-v10.pdf',
              fileSize: '850 KB',
              changeDescription: 'Penerbitan kuitansi verifikasi pembayaran',
              uploadedBy: 'Finance Dept',
              createdAt: '2026-08-07T14:30:00Z',
            },
          ],
          approvals: [],
          auditLogs: [
            {
              id: 'log_rcp_1',
              documentId: 'doc_rcp_001',
              action: 'CREATED',
              performedBy: 'Finance Dept',
              details: 'Penerbitan Kuitansi SAI-RCP-2026-0001',
              timestamp: '2026-08-07T14:30:00Z',
            },
          ],
        },
        {
          id: 'doc_rcp_002',
          documentNumber: 'SAI-RCP-2026-0002',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          invoiceId: 'SAI-INV-2026-0002',
          receiptNumber: 'SAI-RCP-2026-0002',
          name: 'Bukti Pembayaran Kuitansi Resmi Milestone 1 - IDR 150.000.000',
          description: 'Kuitansi Pelunasan Tagihan Milestone 1 (BCA Transfer #TRX-20260813-002).',
          category: 'PAYMENT_RECEIPT',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '860 KB',
          version: '1.0',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'CUSTOMER_PRIVATE',
          storageReference: 'storage/receipts/SAI-RCP-2026-0002.pdf',
          uploadedBy: 'Finance Dept',
          createdAt: '2026-08-13T16:15:00Z',
          updatedAt: '2026-08-13T16:15:00Z',
          downloadCount: 7,
          tags: ['Kuitansi', 'Receipt', 'Milestone 1 Paid'],
          isFavorite: false,
          isPinned: false,
          watermarked: true,
          relatedDocIds: ['doc_inv_002'],
          versions: [
            {
              id: 'ver_rcp2_10',
              documentId: 'doc_rcp_002',
              version: '1.0',
              fileReference: 'storage/receipts/SAI-RCP-2026-0002-v10.pdf',
              fileSize: '860 KB',
              changeDescription: 'Penerbitan kuitansi verifikasi pembayaran milestone 1',
              uploadedBy: 'Finance Dept',
              createdAt: '2026-08-13T16:15:00Z',
            },
          ],
          approvals: [],
          auditLogs: [
            {
              id: 'log_rcp2_1',
              documentId: 'doc_rcp_002',
              action: 'CREATED',
              performedBy: 'Finance Dept',
              details: 'Penerbitan Kuitansi SAI-RCP-2026-0002',
              timestamp: '2026-08-13T16:15:00Z',
            },
          ],
        },
        {
          id: 'doc_req_001',
          documentNumber: 'SAI-REQ-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          name: 'System Requirements Specification (SRS) & User Story Mapping',
          description: 'Spesifikasi Kebutuhan Sistem Terperinci mencakup 42 Modul & Skenario Lapangan Alat Berat.',
          category: 'REQUIREMENT',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '5.2 MB',
          version: '1.2',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'PUBLIC_TO_CUSTOMER',
          storageReference: 'storage/requirements/SAI-REQ-2026-0001.pdf',
          uploadedBy: 'Ahmad Tech Lead & Architect',
          createdAt: '2026-08-08T09:00:00Z',
          updatedAt: '2026-08-09T14:00:00Z',
          downloadCount: 19,
          tags: ['SRS', 'Requirements', 'Specification', 'User Stories'],
          isFavorite: false,
          isPinned: true,
          watermarked: false,
          versions: [
            {
              id: 'ver_req_10',
              documentId: 'doc_req_001',
              version: '1.0',
              fileReference: 'storage/requirements/SAI-REQ-2026-0001-v10.pdf',
              fileSize: '4.8 MB',
              changeDescription: 'Draf Kebutuhan Sistem Awal',
              uploadedBy: 'Ahmad Tech Lead',
              createdAt: '2026-08-08T09:00:00Z',
            },
            {
              id: 'ver_req_12',
              documentId: 'doc_req_001',
              version: '1.2',
              fileReference: 'storage/requirements/SAI-REQ-2026-0001-v12.pdf',
              fileSize: '5.2 MB',
              changeDescription: 'Penambahan protokol koneksi sensor telemetry Caterpillar & Komatsu',
              uploadedBy: 'Ahmad Tech Lead',
              createdAt: '2026-08-09T14:00:00Z',
            },
          ],
          approvals: [
            {
              id: 'app_req_1',
              documentId: 'doc_req_001',
              reviewerId: 'cuser_001',
              reviewerName: 'Hendra Wijaya',
              reviewerRole: 'VP Technology',
              status: 'APPROVED',
              comment: 'SRS v1.2 disetujui sesuai dengan spesifikasi alat berat di lapangan Sangatta.',
              reviewedAt: '2026-08-10T10:00:00Z',
            },
          ],
          auditLogs: [
            {
              id: 'log_req_1',
              documentId: 'doc_req_001',
              action: 'CREATED',
              performedBy: 'Ahmad Tech Lead',
              details: 'Membuat dokumen SRS v1.0',
              timestamp: '2026-08-08T09:00:00Z',
            },
          ],
        },
        {
          id: 'doc_tech_001',
          documentNumber: 'SAI-TECH-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          name: 'IoT Telemetry Architecture & Cloud Infrastructure Specification',
          description: 'Spesifikasi Arsitektur Teknis Microservices, MQTT Message Broker, dan Algoritma Optimasi Rute AI.',
          category: 'TECHNICAL_DOCUMENT',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '6.1 MB',
          version: '2.0',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'PUBLIC_TO_CUSTOMER',
          storageReference: 'storage/technical/SAI-TECH-2026-0001.pdf',
          uploadedBy: 'Senior Cloud Architect',
          createdAt: '2026-08-09T11:00:00Z',
          updatedAt: '2026-08-11T16:00:00Z',
          downloadCount: 25,
          tags: ['Architecture', 'IoT Gateway', 'MQTT', 'Cloud Run'],
          isFavorite: true,
          isPinned: false,
          watermarked: true,
          versions: [
            {
              id: 'ver_tech_10',
              documentId: 'doc_tech_001',
              version: '1.0',
              fileReference: 'storage/technical/SAI-TECH-2026-0001-v10.pdf',
              fileSize: '5.8 MB',
              changeDescription: 'Draf awal arsitektur cloud',
              uploadedBy: 'Cloud Architect',
              createdAt: '2026-08-09T11:00:00Z',
            },
            {
              id: 'ver_tech_20',
              documentId: 'doc_tech_001',
              version: '2.0',
              fileReference: 'storage/technical/SAI-TECH-2026-0001-v20.pdf',
              fileSize: '6.1 MB',
              changeDescription: 'Update топоologi broker MQTT & enkripsi TLS 1.3 data telemetry',
              uploadedBy: 'Cloud Architect',
              createdAt: '2026-08-11T16:00:00Z',
            },
          ],
          approvals: [],
          auditLogs: [
            {
              id: 'log_tech_1',
              documentId: 'doc_tech_001',
              action: 'CREATED',
              performedBy: 'Senior Cloud Architect',
              details: 'Membuat dokumen arsitektur teknis',
              timestamp: '2026-08-09T11:00:00Z',
            },
          ],
        },
        {
          id: 'doc_uix_001',
          documentNumber: 'SAI-UIX-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          name: 'Fleet Operations Dashboard UI/UX Design System & Prototype Specs',
          description: 'Buku Panduan Desain Antarmuka, Palet Warna, Komponen Komando Operator & Figma High-Fidelity Screens.',
          category: 'UI_UX_DOCUMENT',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '12.4 MB',
          version: '1.0',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'PUBLIC_TO_CUSTOMER',
          storageReference: 'storage/design/SAI-UIX-2026-0001.pdf',
          uploadedBy: 'Lead Product Designer',
          createdAt: '2026-08-10T13:00:00Z',
          updatedAt: '2026-08-10T13:00:00Z',
          downloadCount: 16,
          tags: ['Design System', 'UI/UX', 'Figma', 'Dashboard'],
          isFavorite: false,
          isPinned: false,
          watermarked: false,
          versions: [
            {
              id: 'ver_uix_10',
              documentId: 'doc_uix_001',
              version: '1.0',
              fileReference: 'storage/design/SAI-UIX-2026-0001-v10.pdf',
              fileSize: '12.4 MB',
              changeDescription: 'Final UI/UX Design Approval for Mining Dispatch Center',
              uploadedBy: 'Lead Product Designer',
              createdAt: '2026-08-10T13:00:00Z',
            },
          ],
          approvals: [
            {
              id: 'app_uix_1',
              documentId: 'doc_uix_001',
              reviewerId: 'cuser_001',
              reviewerName: 'Hendra Wijaya',
              reviewerRole: 'VP Technology',
              status: 'APPROVED',
              comment: 'Desain UI komando tambang sangat memuaskan dan memenuhi standar visibilitas tinggi.',
              reviewedAt: '2026-08-10T17:00:00Z',
            },
          ],
          auditLogs: [],
        },
        {
          id: 'doc_uat_001',
          documentNumber: 'SAI-UAT-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          name: 'User Acceptance Test (UAT) Scenario Suite & Sign-off Matrix',
          description: 'Daftar Skenario Pengujian Lapangan oleh Tim Pengawas Tambang mencakup 35 Test Cases.',
          category: 'UAT_DOCUMENT',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '2.8 MB',
          version: '1.0',
          status: 'PENDING_REVIEW',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'PUBLIC_TO_CUSTOMER',
          storageReference: 'storage/uat/SAI-UAT-2026-0001.pdf',
          uploadedBy: 'QA Lead (SMART-AI.ID)',
          createdAt: '2026-08-13T09:00:00Z',
          updatedAt: '2026-08-14T11:00:00Z',
          downloadCount: 8,
          tags: ['UAT', 'Test Cases', 'QA Signoff'],
          isFavorite: false,
          isPinned: true,
          watermarked: true,
          versions: [
            {
              id: 'ver_uat_10',
              documentId: 'doc_uat_001',
              version: '1.0',
              fileReference: 'storage/uat/SAI-UAT-2026-0001-v10.pdf',
              fileSize: '2.8 MB',
              changeDescription: 'Dokumen UAT disiapkan untuk diuji pihak pelanggan',
              uploadedBy: 'QA Lead',
              createdAt: '2026-08-13T09:00:00Z',
            },
          ],
          approvals: [
            {
              id: 'app_uat_1',
              documentId: 'doc_uat_001',
              reviewerId: 'cuser_001',
              reviewerName: 'Hendra Wijaya',
              reviewerRole: 'VP Technology',
              status: 'PENDING',
              comment: 'Sedang dilakukan verifikasi skenario uji oleh tim site supervisor Sangatta.',
              reviewedAt: '2026-08-14T11:00:00Z',
            },
          ],
          auditLogs: [
            {
              id: 'log_uat_1',
              documentId: 'doc_uat_001',
              action: 'UPLOADED',
              performedBy: 'QA Lead',
              details: 'Mengunggah draf UAT Suite untuk review pelanggan',
              timestamp: '2026-08-13T09:00:00Z',
            },
          ],
        },
        {
          id: 'doc_rel_001',
          documentNumber: 'SAI-REL-2026-0100',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          name: 'Release Notes v1.0.0-rc1 (Sensor Processing Engine & Route Optimizer)',
          description: 'Catatan Rilis Resmi versi 1.0.0-rc1 mencakup daftar fitur baru, perbaikan bug, dan panduan migrasi.',
          category: 'RELEASE_NOTE',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '1.5 MB',
          version: '1.0',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'PUBLIC_TO_CUSTOMER',
          storageReference: 'storage/releases/SAI-REL-2026-0100.pdf',
          uploadedBy: 'Release Manager (SMART-AI.ID)',
          createdAt: '2026-08-12T15:00:00Z',
          updatedAt: '2026-08-12T15:00:00Z',
          downloadCount: 11,
          tags: ['Release Notes', 'v1.0.0-rc1', 'Changelog'],
          isFavorite: false,
          isPinned: false,
          watermarked: false,
          versions: [
            {
              id: 'ver_rel_10',
              documentId: 'doc_rel_001',
              version: '1.0',
              fileReference: 'storage/releases/SAI-REL-2026-0100-v10.pdf',
              fileSize: '1.5 MB',
              changeDescription: 'Catatan Rilis v1.0.0-rc1 resmi diterbitkan',
              uploadedBy: 'Release Manager',
              createdAt: '2026-08-12T15:00:00Z',
            },
          ],
          approvals: [],
          auditLogs: [],
        },
        {
          id: 'doc_man_001',
          documentNumber: 'SAI-MAN-2026-0001',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          name: 'Panduan Penggunaan Sistem (User & Administrator Operational Manual)',
          description: 'Buku Petunjuk Operasional Aplikasi untuk Dispatcher, Driver Operator, dan System Administrator.',
          category: 'USER_MANUAL',
          type: 'PDF',
          mimeType: 'application/pdf',
          fileSize: '8.7 MB',
          version: '1.1',
          status: 'ACTIVE',
          visibility: 'CUSTOMER_VISIBLE',
          classification: 'PUBLIC_TO_CUSTOMER',
          storageReference: 'storage/manuals/SAI-MAN-2026-0001.pdf',
          uploadedBy: 'Technical Writer Lead',
          createdAt: '2026-08-11T10:00:00Z',
          updatedAt: '2026-08-13T14:20:00Z',
          downloadCount: 34,
          tags: ['User Manual', 'Panduan Operasional', 'Admin Manual'],
          isFavorite: true,
          isPinned: true,
          watermarked: false,
          versions: [
            {
              id: 'ver_man_10',
              documentId: 'doc_man_001',
              version: '1.0',
              fileReference: 'storage/manuals/SAI-MAN-2026-0001-v10.pdf',
              fileSize: '8.2 MB',
              changeDescription: 'Draf awal buku panduan pengguna',
              uploadedBy: 'Technical Writer',
              createdAt: '2026-08-11T10:00:00Z',
            },
            {
              id: 'ver_man_11',
              documentId: 'doc_man_001',
              version: '1.1',
              fileReference: 'storage/manuals/SAI-MAN-2026-0001-v11.pdf',
              fileSize: '8.7 MB',
              changeDescription: 'Penambahan bab trobleshoot koneksi sensor telemetry saat offline',
              uploadedBy: 'Technical Writer',
              createdAt: '2026-08-13T14:20:00Z',
            },
          ],
          approvals: [],
          auditLogs: [],
        },
      ];

      localStorage.setItem(STORAGE_DOCUMENTS, JSON.stringify(defaultDocs));
    }

    if (!localStorage.getItem(STORAGE_DOC_REQUESTS)) {
      const defaultRequests: DocumentRequest[] = [
        {
          id: 'req_doc_01',
          companyId: 'COMP-001',
          companyName: 'PT Nusantara Mining Energy',
          projectId: 'PROJ-001',
          projectName: 'Smart Mining Fleet & IoT Analytics Platform',
          requestedBy: 'cuser_002',
          requestedByName: 'Siti Rahmayanti (Finance)',
          documentType: 'PAYMENT_RECEIPT',
          description: 'Permintaan Sertifikat Bebas Potong PPh 23 dan Faktur Pajak Resmi untuk Pembayaran DP.',
          requiredByDate: '2026-08-20',
          status: 'IN_PROGRESS',
          message: 'Mohon agar Faktur Pajak elektronik dilampirkan bersama kuitansi resmi ter-stempel.',
          createdAt: '2026-08-14T09:00:00Z',
          updatedAt: '2026-08-14T10:30:00Z',
        },
      ];
      localStorage.setItem(STORAGE_DOC_REQUESTS, JSON.stringify(defaultRequests));
    }
  }

  public static getAllDocuments(): DocumentModel[] {
    this.initialize();
    try {
      const data = localStorage.getItem(STORAGE_DOCUMENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private static saveAllDocuments(docs: DocumentModel[]): void {
    localStorage.setItem(STORAGE_DOCUMENTS, JSON.stringify(docs));
  }

  /**
   * Filter & Search Documents strictly considering Customer Authorization
   */
  public static getDocuments(
    companyId: string,
    userRole: CustomerRole | 'ADMIN' = 'CUSTOMER_ADMIN',
    filters: DocumentFilterOptions = {}
  ): DocumentModel[] {
    let all = this.getAllDocuments();

    // Tenant & Security Filtering
    if (userRole !== 'ADMIN') {
      all = all.filter(
        (doc) =>
          doc.companyId === companyId &&
          doc.visibility === 'CUSTOMER_VISIBLE' &&
          !doc.isArchived
      );

      // RBAC Permission Sub-Filtering for Customer Roles
      if (userRole === 'CUSTOMER_FINANCE') {
        all = all.filter((doc) =>
          ['QUOTATION', 'CONTRACT', 'INVOICE', 'PAYMENT_RECEIPT', 'PROPOSAL', 'OTHER'].includes(doc.category)
        );
      } else if (userRole === 'CUSTOMER_PROJECT_MANAGER') {
        all = all.filter((doc) =>
          [
            'PROJECT_DOCUMENT',
            'REQUIREMENT',
            'TECHNICAL_DOCUMENT',
            'UI_UX_DOCUMENT',
            'UAT_DOCUMENT',
            'RELEASE_NOTE',
            'USER_MANUAL',
            'PROPOSAL',
            'CONTRACT',
            'OTHER',
          ].includes(doc.category)
        );
      }
    } else {
      // Admin sees company documents or all
      if (companyId && companyId !== 'ALL') {
        all = all.filter((doc) => doc.companyId === companyId);
      }
    }

    // Category Filter
    if (filters.category && filters.category !== 'ALL') {
      all = all.filter((doc) => doc.category === filters.category);
    }

    // Project Filter
    if (filters.projectId && filters.projectId !== 'ALL') {
      all = all.filter((doc) => doc.projectId === filters.projectId);
    }

    // Status Filter
    if (filters.status && filters.status !== 'ALL') {
      all = all.filter((doc) => doc.status === filters.status);
    }

    // Classification Filter
    if (filters.classification && filters.classification !== 'ALL') {
      all = all.filter((doc) => doc.classification === filters.classification);
    }

    // Favorites / Pinned
    if (filters.showFavoritesOnly) {
      all = all.filter((doc) => doc.isFavorite);
    }
    if (filters.showPinnedOnly) {
      all = all.filter((doc) => doc.isPinned);
    }

    // Search Query (matches Name, Document Number, Project, Quotation #, Invoice #, Category, Version, Tags)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      all = all.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.documentNumber.toLowerCase().includes(q) ||
          (doc.projectName && doc.projectName.toLowerCase().includes(q)) ||
          (doc.quotationNumber && doc.quotationNumber.toLowerCase().includes(q)) ||
          (doc.invoiceNumber && doc.invoiceNumber.toLowerCase().includes(q)) ||
          (doc.contractNumber && doc.contractNumber.toLowerCase().includes(q)) ||
          doc.category.toLowerCase().includes(q) ||
          doc.version.toLowerCase().includes(q) ||
          (doc.tags && doc.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sort Options
    const sortBy = filters.sortBy || 'NEWEST';
    all.sort((a, b) => {
      if (sortBy === 'NEWEST') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'OLDEST') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'NAME_ASC') return a.name.localeCompare(b.name);
      if (sortBy === 'NAME_DESC') return b.name.localeCompare(a.name);
      if (sortBy === 'RECENTLY_UPDATED') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      return 0;
    });

    return all;
  }

  public static getDocumentById(
    id: string,
    companyId: string,
    userRole: CustomerRole | 'ADMIN' = 'CUSTOMER_ADMIN'
  ): DocumentModel | null {
    const list = this.getDocuments(companyId, userRole, {});
    const found = list.find((doc) => doc.id === id || doc.documentNumber === id);
    return found || null;
  }

  public static getKPIs(companyId: string, userRole: CustomerRole | 'ADMIN' = 'CUSTOMER_ADMIN') {
    const docs = this.getDocuments(companyId, userRole, {});
    return {
      totalDocuments: docs.length,
      proposals: docs.filter((d) => d.category === 'PROPOSAL').length,
      quotations: docs.filter((d) => d.category === 'QUOTATION').length,
      contracts: docs.filter((d) => d.category === 'CONTRACT').length,
      invoices: docs.filter((d) => d.category === 'INVOICE').length,
      receipts: docs.filter((d) => d.category === 'PAYMENT_RECEIPT').length,
      projectDocs: docs.filter((d) =>
        ['PROJECT_DOCUMENT', 'REQUIREMENT', 'TECHNICAL_DOCUMENT', 'UI_UX_DOCUMENT', 'UAT_DOCUMENT', 'RELEASE_NOTE'].includes(d.category)
      ).length,
      userManuals: docs.filter((d) => d.category === 'USER_MANUAL').length,
      actionRequired: docs.filter((d) => d.status === 'PENDING_REVIEW' || (d.contractDetails && d.contractDetails.signatureStatus === 'PENDING')).length,
    };
  }

  /**
   * Add new Version to an existing Document
   */
  public static addVersion(
    docId: string,
    versionNumber: string,
    changeDescription: string,
    uploadedBy: string
  ): DocumentModel | null {
    const docs = this.getAllDocuments();
    const idx = docs.findIndex((d) => d.id === docId);
    if (idx === -1) return null;

    const doc = docs[idx];
    const newVersionObj: DocumentVersion = {
      id: `ver_${Date.now()}`,
      documentId: doc.id,
      version: versionNumber,
      fileReference: `storage/${doc.category.toLowerCase()}/${doc.documentNumber}-v${versionNumber}.pdf`,
      fileSize: doc.fileSize,
      changeDescription,
      uploadedBy,
      createdAt: new Date().toISOString(),
    };

    // Mark previous versions as superseded if applicable
    doc.versions = [newVersionObj, ...(doc.versions || [])];
    doc.version = versionNumber;
    doc.updatedAt = new Date().toISOString();

    // Audit Log
    doc.auditLogs = [
      {
        id: `log_${Date.now()}`,
        documentId: doc.id,
        action: 'VERSION_CREATED',
        performedBy: uploadedBy,
        details: `Menambahkan versi baru ${versionNumber}: ${changeDescription}`,
        timestamp: new Date().toISOString(),
      },
      ...(doc.auditLogs || []),
    ];

    docs[idx] = doc;
    this.saveAllDocuments(docs);
    return doc;
  }

  /**
   * Log Document View or Download Action
   */
  public static recordAction(
    docId: string,
    action: 'VIEWED' | 'DOWNLOADED' | 'SHARED',
    performedBy: string,
    details?: string
  ): void {
    const docs = this.getAllDocuments();
    const idx = docs.findIndex((d) => d.id === docId);
    if (idx === -1) return;

    const doc = docs[idx];
    if (action === 'DOWNLOADED') {
      doc.downloadCount = (doc.downloadCount || 0) + 1;
    }

    doc.auditLogs = [
      {
        id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        documentId: doc.id,
        action,
        performedBy,
        details: details || `Aksi ${action} dilakukan oleh ${performedBy}`,
        timestamp: new Date().toISOString(),
      },
      ...(doc.auditLogs || []),
    ];

    docs[idx] = doc;
    this.saveAllDocuments(docs);
  }

  /**
   * Toggle Favorite or Pin
   */
  public static toggleFlag(docId: string, flag: 'isFavorite' | 'isPinned'): boolean {
    const docs = this.getAllDocuments();
    const idx = docs.findIndex((d) => d.id === docId);
    if (idx === -1) return false;

    docs[idx][flag] = !docs[idx][flag];
    this.saveAllDocuments(docs);
    return !!docs[idx][flag];
  }

  /**
   * Create Document Request
   */
  public static createRequest(req: Partial<DocumentRequest>): DocumentRequest {
    const requests = this.getRequests();
    const newReq: DocumentRequest = {
      id: `req_${Date.now()}`,
      companyId: req.companyId || 'COMP-001',
      companyName: req.companyName || 'PT Nusantara Mining Energy',
      projectId: req.projectId,
      projectName: req.projectName,
      requestedBy: req.requestedBy || 'cuser_001',
      requestedByName: req.requestedByName || 'Hendra Wijaya',
      documentType: req.documentType || 'OTHER',
      description: req.description || '',
      requiredByDate: req.requiredByDate || new Date().toISOString().split('T')[0],
      status: 'REQUESTED',
      message: req.message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    requests.unshift(newReq);
    localStorage.setItem(STORAGE_DOC_REQUESTS, JSON.stringify(requests));
    return newReq;
  }

  public static getRequests(companyId?: string): DocumentRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_DOC_REQUESTS);
      const list: DocumentRequest[] = data ? JSON.parse(data) : [];
      if (companyId) {
        return list.filter((r) => r.companyId === companyId);
      }
      return list;
    } catch {
      return [];
    }
  }

  /**
   * Generate Time-Limited Share Link
   */
  public static generateShareLink(docId: string, createdBy: string, durationDays: number = 7): DocumentShare {
    const token = `share_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
    const expires = new Date();
    expires.setDate(expires.getDate() + durationDays);

    const shareObj: DocumentShare = {
      id: `sh_${Date.now()}`,
      documentId: docId,
      tokenHash: token,
      shareUrl: `${window.location.origin}/portal/documents/share?token=${token}`,
      createdBy,
      expiresAt: expires.toISOString(),
      createdAt: new Date().toISOString(),
    };

    const docs = this.getAllDocuments();
    const idx = docs.findIndex((d) => d.id === docId);
    if (idx !== -1) {
      docs[idx].shareLinks = [shareObj, ...(docs[idx].shareLinks || [])];
      this.recordAction(docId, 'SHARED', createdBy, `Membuat tautan berbagi aman yang berlaku hingga ${expires.toLocaleDateString('id-ID')}`);
      this.saveAllDocuments(docs);
    }

    return shareObj;
  }

  /**
   * Revoke Share Link
   */
  public static revokeShareLink(docId: string, shareId: string, revokedBy: string): void {
    const docs = this.getAllDocuments();
    const idx = docs.findIndex((d) => d.id === docId);
    if (idx !== -1) {
      const links = docs[idx].shareLinks || [];
      const linkIdx = links.findIndex((l) => l.id === shareId);
      if (linkIdx !== -1) {
        links[linkIdx].revokedAt = new Date().toISOString();
        docs[idx].shareLinks = links;
        this.saveAllDocuments(docs);
      }
    }
  }
}

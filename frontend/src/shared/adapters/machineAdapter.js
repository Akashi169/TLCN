/**
 * MachineAdapter Utility (Frontend Mapper)
 * Enforces Single Responsibility Principle (SRP): Transforms raw backend computer response DTOs into Frontend UI Machine objects.
 * Uses Object Mapping & Optional Chaining (?.) and maps directly from CSDL Seeder data.
 */

// Zone Icon Mapping Dictionary
const ZONE_ICON_MAP = Object.freeze({
  1: 'military_tech',
  2: 'hotel_class',
  3: 'dns',
  4: 'videocam',
  5: 'cloud_sync'
});

// Computer Status Mapping Dictionary (aligned 100% with backend ComputerStatus enum)
const STATUS_CONFIG_MAP = Object.freeze({
  ONLINE: { status: 'online', statusLabel: 'Online (Sẵn sàng)', cleanStatus: 'Sẵn sàng nạp khách' },
  IN_USE: { status: 'in-use', statusLabel: 'Đang sử dụng', cleanStatus: 'Khách đang hoạt động' },
  MAINTENANCE: { status: 'maintenance', statusLabel: 'Bảo trì', cleanStatus: 'Đang kiểm tra phần cứng' },
  OFFLINE: { status: 'offline', statusLabel: 'Offline', cleanStatus: 'Tắt nguồn' },
  LOCKED: { status: 'locked', statusLabel: 'Tạm khóa', cleanStatus: 'Trạm bị khóa' },
  PAUSE: { status: 'locked', statusLabel: 'Tạm dừng', cleanStatus: 'Phiên bị tạm dừng' },
  REMOTE: { status: 'remote', statusLabel: 'Cloud Remote', cleanStatus: 'Trạm kết nối từ xa' }
});

const DEFAULT_STATUS_CONFIG = Object.freeze({
  status: 'offline',
  statusLabel: 'Offline',
  cleanStatus: 'Tắt nguồn'
});

/**
 * Map single raw Computer entity from API (populated from Seeder CSDL) into UI Machine DTO
 * @param {object} c - Raw Computer item from backend Sequelize query
 */
export function mapComputerToMachineDTO(c) {
  if (!c) return null;

  const zoneId = c.zone_id || 1;
  const zoneIcon = ZONE_ICON_MAP[zoneId] || 'military_tech';
  const statusConfig = STATUS_CONFIG_MAP[c.status] || DEFAULT_STATUS_CONFIG;

  // Extract zone name & description populated from backend CSDL Seeder
  const zoneName = c.zone_name || c.ComputerZone?.zone_name || `Zone ${zoneId}`;
  const zoneDesc = c.ComputerZone?.description || '';

  // Optional Chaining (?.): Extract active user info & logs cleanly from backend response
  const latestLog = c.ComputerStatusLogs?.[0] || c.RentalSessions?.[0];
  const memberObj = latestLog?.Member || c.Member;
  const userName = memberObj?.userInfo?.full_name || memberObj?.userInfo?.username || c.user || null;

  const userInitials = userName
    ? userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : null;

  const currentGame = latestLog?.notes || c.game || (c.status === 'IN_USE' ? 'Phiên chơi hoạt động' : null);

  let type = 'ready';
  if (c.status === 'IN_USE') type = c.is_remote_enabled ? 'cloud' : 'local';
  else if (c.status === 'MAINTENANCE') type = 'maint';
  else if (c.status === 'OFFLINE') type = 'off';
  else if (c.status === 'LOCKED') type = 'locked';

  return {
    id: c.computer_name || c.id || `PC-${c.computer_id}`,
    computer_id: c.computer_id,
    numericId: String(c.computer_id || 1).padStart(2, '0'),
    ip: c.ip_address || `192.168.1.${100 + (c.computer_id || 1)}`,
    port: `Port #${c.computer_id || 1}`,
    zoneId: `zone-${zoneId}`,
    zoneName,
    zoneIcon,
    specDescription: zoneDesc,
    cpu: c.is_remote_enabled ? 'Cloud vGPU Core' : 'Intel Core High Performance',
    gpu: c.is_remote_enabled ? 'RTX 4090 Cloud vGPU' : 'NVIDIA GeForce RTX',
    ram: '32GB DDR5',
    bootImage: 'Win11-Pro-Cyber-v25.02',
    userName,
    userRank: memberObj?.Rank?.name ? `Rank ${memberObj.Rank.name}` : null,
    userInitials,
    currentGame,
    cleanStatus: statusConfig.cleanStatus,
    status: statusConfig.status,
    statusLabel: statusConfig.statusLabel,
    type
  };
}

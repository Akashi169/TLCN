/**
 * Profile System Default Constants
 * Centralized configuration to prevent Magic Strings & Magic Numbers
 */
module.exports = {
  DEFAULT_AVATAR_URL: process.env.DEFAULT_AVATAR_URL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs8dBAUHnsFAlRsHsjgaT6wrKt-GrttfGiw1_eIniAUOa-8Njbsfgqvj8LCwo2GG725KkvX-7UNAQWJU9OuU_WzUP2CgXPbJRiUV2hQPM7ZklsLgfjfm4Z126zsxn16iDfJkNt5VahCr6FbdbVPCJ1uVXn-eawT4Ch_6ofpZq9gypCMIlKT5S6zHbGA5K0ArpqFJa2jp1YtccknO3eEtqIE2EFI4SYJqeoQORRG8KlTgY0AUReON8',
  DEFAULT_REGION_TAG: 'VN#01',
  DEFAULT_RANK_NAME: 'Đồng',
  DEFAULT_ZONE_NAME: 'Chưa phân vùng máy chủ',
  DEFAULT_CLOUD_PREFERENCES: {
    RESOLUTION: '4K UHD • 144 FPS (Ultra Low Latency)',
    BITRATE: '50 Mbps - Cực cao (Khuyến nghị 4K)',
    HDR: true,
    RAY_TRACING: true,
    DIRECT_AUDIO: true
  },
  SYSTEM_UID_PREFIX: process.env.SYSTEM_UID_PREFIX || 'NX',
  ALLOWED_GENDERS: ['MALE', 'FEMALE', 'OTHER', 'Nam (Male)', 'Nữ (Female)', 'Khác (Other)']
};

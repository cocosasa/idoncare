// type MissionStatusText = "진행중"|"완료"|"취소"|"최근"|"요청중"|"미지급"

// export enum ChipStyle {
//   진행중="",
//   완료="",
//   취소="",
//   최근="",
//   요청중="",
//   미지급=""
// }

function StatusChip(status: string) {
  return (
    <div>
      {status}
    </div>
  )
}

export default StatusChip
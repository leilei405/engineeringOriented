export const NoFlags = 0b00000000000000000000000000000000; // 没有任何标志

export const Placement = 0b00000000000000000000000000000010; // 插入

export const Update = 0b00000000000000000000000000000100; // 更新

export const Deletion = 0b00000000000000000000000000000100; // 删除

export const ChildDeletion = 0b00000000000000000000000000001000; // 子节点删除



export const MutationMask = Placement | Update | Deletion | ChildDeletion; // 所有的标志
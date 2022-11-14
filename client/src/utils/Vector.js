export const getDistance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);
}

export const getMidPoint = (p1, p2) => {
  return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, z: (p1.z + p2.z) / 2 };
}

export const getDirectionVector = (p1, p2) => {
  return { x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z };
}

/**
 * 
 * @param {object} v1 x, y, z를 가지는 vector 
 * @param {object} v2 x, y, z를 가지는 vector
 * @returns v1과 v2 사이의 각도 (degree)
 */
export const getDegree = (v1, v2) => {
    const d1_ = Math.sqrt(v1.x**2+v1.y**2);
    const d2_ = Math.sqrt(v2.x**2+v2.y**2);
    const innerProduct = v1.x*v2.x + v1.y*v2.y;
    const cos = innerProduct / (d1_ * d2_);
    return Math.acos(cos) / Math.PI * 180;
}